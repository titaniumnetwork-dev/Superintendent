import type {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
	SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import type { ILogObj, Logger } from "tslog";
import type { StructurePredicate } from "../util/loaders.ts";

/** Command contract for slash command modules. */
export interface Command {
	/** Discord slash command data configuration. */
	data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder | SlashCommandSubcommandsOnlyBuilder;

	/**
	 * Command execution handler.
	 * @param interaction Discord slash command interaction.
	 * @param logger Logger instance.
	 */
	execute: (
		interaction: ChatInputCommandInteraction,
		logger: Logger<ILogObj>
	) => Promise<void> | void;

	/**
	 * Autocomplete handler for slash command options.
	 * @param interaction Autocomplete interaction.
	 */
	autocomplete?: (interaction: AutocompleteInteraction) => Promise<void> | void;
}

/**
 * Predicate function to validate command structure.
 * @param structure Object to validate as a Command.
 * @returns Whether structure is a valid Command.
 */
export const predicate: StructurePredicate<Command> = (structure): structure is Command => {
	if (!structure || typeof structure !== "object") {
		return false;
	}

	const candidate = structure as Record<PropertyKey, unknown>;

	const hasRequiredProperties =
		"data" in candidate &&
		"execute" in candidate &&
		typeof candidate.data === "object" &&
		typeof candidate.execute === "function";

	const hasValidAutocomplete =
		!("autocomplete" in candidate) || typeof candidate.autocomplete === "function";

	return hasRequiredProperties && hasValidAutocomplete;
};
