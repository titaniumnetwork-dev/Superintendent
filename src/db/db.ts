interface DB {
	allowed_roles: string[];
}

export function loadDB(): DB {
	try {
		const raw = Bun.file(process.env.DB_FILE);
		const json = raw.json();
		if (!json) return { allowed_roles: [] }
		return json as unknown as DB;
	} catch {
		return { allowed_roles: [] };
	}
}

export function saveDB() {
	const file = Bun.file(process.env.DB_FILE);
	file.write(JSON.stringify(db, null, 2));
}

export const db = loadDB();
