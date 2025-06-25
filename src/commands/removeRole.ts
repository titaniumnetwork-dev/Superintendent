import { InteractionContextType, SlashCommandBuilder } from "discord.js";
import type { Command } from ".";
import { db, saveDB } from "../db/db";

export default {
	data: new SlashCommandBuilder()
		.setName("removerole")
		.setDescription("Disallow a role from being granted")
		.addRoleOption((opt) =>
			opt.setName("role").setDescription("Role to disallow").setRequired(true)
		)
		.setContexts(InteractionContextType.Guild),

	async execute(interaction) {
		const role = interaction.options.getRole("role", true);
		db.allowed_roles = db.allowed_roles.filter((id) => id !== role.id);
		saveDB();
		return interaction.reply({
			content: `Removed <@&${role.id}> from allowed roles.`,
		});
	},
} as Command;
