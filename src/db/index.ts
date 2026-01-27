import fs from "node:fs";

interface DB {
	allowed_roles: string[];
}

export function loadDB(): DB {
	try {
		const raw = fs.readFileSync(process.env.DB_FILE, "utf8");
		return JSON.parse(raw);
	} catch {
		return { allowed_roles: [] };
	}
}

export function saveDB() {
	Bun.write(process.env.DB_FILE, JSON.stringify(db, null, 2));
}

const db = loadDB();

export default db;