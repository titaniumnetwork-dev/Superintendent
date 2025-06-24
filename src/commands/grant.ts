import { db } from "../db/db.ts";
import type { Command } from "./index.ts";
import { GuildMemberRoleManager, SlashCommandBuilder } from "discord.js";

export default {
	data: new SlashCommandBuilder()
		.setName("grant")
		.setDescription("Grant an allowed role to a user")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("User to grant the role")
				.setRequired(true)
		)
		.addRoleOption((option) =>
			option.setName("role").setDescription("Role to grant").setRequired(true)
		),
	async execute(interaction) {
		const user = interaction.options.getUser("user");
		if (!user) return;
		const member = interaction.options.getMember("user");
		if (!member) return;
		const role = interaction.options.getRole("role", true);
		if (!db.allowed_roles.includes(role.id)) {
			return interaction.reply({
				content: "Role not allowed",
			});
		}
		await (member.roles as GuildMemberRoleManager).add(role.id);

		return interaction.reply({
			content: `Granted <@&${role.id}> to <@!${user.id}>`,
		});
	},
} as Command;
