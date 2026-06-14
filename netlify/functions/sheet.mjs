const SHEET_ID = '1w9xSxr5KW_FpiwDfRZfX3QSVxpo2NCYMGgOjyq3InnE';
const SHEET_URL =
	'https://script.google.com/macros/s/AKfycbxp9t6-txkFRcGNH4Oo9VfnaX3Tt5nh6QnPv-lDfd4H-82AXkc1uEBrcKOAZqBJQinQ/exec';

export default async (req) => {
	try {
		const body = req.method === 'POST' ? await req.json() : {};
		const { action = 'append', value, row } = body;
		if (!value) return Response.json(null, { status: 400 });

		const params = new URLSearchParams({
			sheetId: SHEET_ID,
			action,
			value: JSON.stringify(value),
		});
		if (row) params.append('row', row);

		const res = await fetch(`${SHEET_URL}?${params}`);
		const data = await res.json();
		return Response.json(data);
	} catch {
		return Response.json({ error: 'lỗi proxy' }, { status: 500 });
	}
};

export const config = {
	path: '/api/sheet',
};
