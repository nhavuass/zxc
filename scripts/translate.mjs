import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_LANG = 'en';
const LANG_DIR = path.join(__dirname, '..', 'lang');
const REQUEST_DELAY = 300;

const targetLangs = () => {
  const files = fs.readdirSync(LANG_DIR);
  return files
    .filter(f => f.endsWith('.json') && f !== `${SOURCE_LANG}.json`)
    .map(f => path.basename(f, '.json'));
};

const translateText = async (text, targetLang) => {
  const url =
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${SOURCE_LANG}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  return data?.[0]?.map(item => item[0]).filter(Boolean).join('') || text;
};

const main = async () => {
  const source = JSON.parse(fs.readFileSync(path.join(LANG_DIR, `${SOURCE_LANG}.json`), 'utf-8'));
  const sourceKeys = Object.keys(source);
  const langs = targetLangs();

  for (let i = 0; i < langs.length; i++) {
    const lang = langs[i];
    console.log(`[${i + 1}/${langs.length}] ${lang}...`);

    const targetPath = path.join(LANG_DIR, `${lang}.json`);
    const target = fs.existsSync(targetPath)
      ? JSON.parse(fs.readFileSync(targetPath, 'utf-8'))
      : {};

    console.log(`  ${sourceKeys.length} keys to translate`);

    for (let j = 0; j < sourceKeys.length; j++) {
      const key = sourceKeys[j];
      const text = source[key];

      if (/^\{[\w()]+\}$/.test(text)) {
        target[key] = text;
        continue;
      }

      try {
        target[key] = await translateText(text, lang);
        if ((j + 1) % 10 === 0) {
          console.log(`  Progress: ${j + 1}/${sourceKeys.length}`);
        }
        await new Promise(r => setTimeout(r, REQUEST_DELAY));
      } catch (err) {
        console.error(`  Error translating "${key}": ${err.message}`);
      }
    }
    const ordered = {};
    for (const k of sourceKeys) {
      if (k in target) ordered[k] = target[k];
    }
    fs.writeFileSync(targetPath, JSON.stringify(ordered, null, 2));
    console.log('  done');
  }
};

main();
