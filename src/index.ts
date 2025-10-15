import { Client, GatewayIntentBits } from "discord.js";

import { loadCommands, loadEvents } from "./util/loaders.ts";
import { registerEvents } from "./util/registerEvents.ts";
import { registerCommands } from "./util/deploy.ts";
import { createMainLogger } from "./logger.ts";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

const logger = createMainLogger();

// Load the events and commands
const events = await loadEvents(new URL("events/", import.meta.url), true, logger);
const commands = await loadCommands(new URL("commands/", import.meta.url), true, logger);

// Register the event handlers
registerEvents(commands, events, client, logger);
registerCommands(commands, logger);

// Login to the client
client.login(process.env.DISCORD_TOKEN);
