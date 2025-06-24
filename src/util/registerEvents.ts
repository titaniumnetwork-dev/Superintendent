import { ChatInputCommandInteraction, Client, Events } from "discord.js";
import type { Event } from "../events/index.ts";
import type { Command } from "../commands/index.ts";

export function registerEvents(
	commands: Map<string, Command>,
	events: Event[],
	client: Client
) {
	// Create an event to handle command interactions
	const interactionCreateEvent = {
		name: Events.InteractionCreate,
		async execute(interaction) {
			if (!interaction.isCommand()) return;

			const command = commands.get(interaction.commandName);

			if (!command) {
				throw new Error(`Command '${interaction.commandName}' not found.`);
			}

			await command.execute(interaction as ChatInputCommandInteraction);
		},
	} as Event<Events.InteractionCreate>;

	for (const event of [...events, interactionCreateEvent]) {
		client[event.once ? "once" : "on"](event.name, async (...args: any[]) =>
			event.execute(...args)
		);
	}
}
