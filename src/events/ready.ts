import { Events } from "discord.js";

import type { Event } from "../events/index.ts";
import { createSubLogger } from "../logger.ts";

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client, logger) {
		const evLogger = createSubLogger(logger, "Ready");

		evLogger.info(`Logged in as ${client.user.tag} (ID: ${client.user.id})`);
	},
} as Event<Events.ClientReady>;
