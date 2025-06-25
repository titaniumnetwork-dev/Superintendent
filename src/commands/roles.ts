import { InteractionContextType, MessageFlags, SlashCommandBuilder } from "discord.js";
import { db } from "../db/db.ts";
import type { Command } from "./index.ts";

export default {
	data: new SlashCommandBuilder()
		.setName("roles")
		.setDescription("List all allowed roles")
		.setContexts(InteractionContextType.Guild),

	async execute(interaction) {
		const list =
			db.allowed_roles.map((r) => `<@&${r}>`).join("\n") ||
			"**No roles configured**";

		return interaction.reply({
			content: `Allowed roles:\n${list}`,
			flags: [MessageFlags.Ephemeral]
		});
	},
} as Command;
