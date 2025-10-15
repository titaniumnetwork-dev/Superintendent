/**
 * @fileoverview Registers slash commands to Discord.
 */

import { API } from "@discordjs/core/http-only";
import { REST } from "discord.js";

import type { ILogObj, Logger } from "tslog";

import type { Command } from "../commands/index.ts";

/**
 * Registers slash commands to Discord.
 * @param commands Commands to register.
 * @param logger A sublogger.
 */
export async function registerCommands(commands: Map<string, Command>, logger: Logger<ILogObj>) {
	logger.info("Started refreshing application (/) commands");

	const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
	const api = new API(rest);

	const commandData = [...commands.values()].map((command) => command.data.toJSON());
	await api.applicationCommands.bulkOverwriteGlobalCommands(process.env.CLIENT_ID, commandData);

	logger.info("Reloaded application (/) commands");
}
