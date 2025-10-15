/**
 * @fileoverview Registers the Discord event handlers.
 */

import {
	type ChatInputCommandInteraction,
	type Client,
	type ClientEvents,
	Events,
} from "discord.js";
import type { ILogObj, Logger } from "tslog";

import type { Command } from "../commands/index.ts";
import type { Event } from "../events/index.ts";
import { createSubLogger } from "../logger.ts";

/**
 * Registers the Discord event handlers.
 * @param commands Commands to register.
 * @param events Events to register.
 * @param client Discord.js client.
 * @param logger A sublogger.
 */
export function registerEvents(
	commands: Map<string, Command>,
	events: Event[],
	client: Client,
	logger: Logger<ILogObj>
) {
	const interactionCreateEvent = {
		name: Events.InteractionCreate,
		async execute(interaction, logger: Logger<ILogObj>) {
			if (interaction.isAutocomplete()) {
				const command = commands.get(interaction.commandName);

				if (!command) {
					return;
				}

				if (command.autocomplete) {
					await command.autocomplete(interaction);
				}

				return;
			}

			if (!interaction.isCommand()) {
				return;
			}

			const command = commands.get(interaction.commandName);

			if (!command) {
				createSubLogger(logger, "InteractionCreate").warn(
					`Command '${interaction.commandName}' not found in command registry`
				);
				return;
			}

			await command.execute(
				interaction as ChatInputCommandInteraction,
				createSubLogger(logger, `Command: ${interaction.commandName}`)
			);
		},
	} as Event<Events.InteractionCreate>;

	client[interactionCreateEvent.once ? "once" : "on"](interactionCreateEvent.name, (interaction) =>
		interactionCreateEvent.execute(interaction, logger)
	);

	for (const event of events) {
		const eventHandler = async (...args: ClientEvents[keyof ClientEvents]) => {
			const typedExecute = event.execute as (
				...parameters: [...ClientEvents[keyof ClientEvents], Logger<ILogObj>]
			) => Promise<void> | void;
			await typedExecute(...args, logger);
		};

		client[event.once ? "once" : "on"](event.name, eventHandler);
	}
}
