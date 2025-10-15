import { InteractionContextType, SlashCommandBuilder } from "discord.js";
import type { Command } from "./index.ts";
import { db, saveDB } from "../db/db";

export default {
	data: new SlashCommandBuilder()
		.setName("addrole")
		.setDescription("Allow a role to be grantable")
		.addRoleOption((opt) => opt.setName("role").setDescription("Role to allow").setRequired(true))
		.setContexts(InteractionContextType.Guild),

	async execute(interaction) {
		const role = interaction.options.getRole("role", true);
		db.allowed_roles.push(role.id);
		saveDB();
		await interaction.reply({
			content: `Added <@&${role.id}> to allowed roles.`,
		});
	},
} as Command;
