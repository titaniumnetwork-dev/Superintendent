declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string;
			CLIENT_ID: string;
			CLIENT_SECRET: string;

			DB_FILE: string;
		}
	}
}

export {};
