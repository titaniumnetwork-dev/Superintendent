import {
	type GuildMemberRoleManager,
	InteractionContextType,
	MessageFlags,
	SlashCommandBuilder,
} from "discord.js";

import { db } from "../db/db.ts";
import type { Command } from "./index.ts";


export default {
	data: new SlashCommandBuilder()
		.setName("revoke")
		.setDescription("Remove a granted role from a user")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("User to remove the role from")
				.setRequired(true)
		)
		.addRoleOption((option) =>
			option.setName("role").setDescription("Role to remove").setRequired(true)
		)
		.setContexts(InteractionContextType.Guild),

	async execute(interaction) {
		const user = interaction.options.getUser("user");
		if (!user) return;
		const member = interaction.options.getMember("user");
		if (!member) return;
		const role = interaction.options.getRole("role", true);
		if (!db.allowed_roles.includes(role.id)) {
			return interaction.reply({
				content: "Role not allowed.",
				flags: [MessageFlags.Ephemeral],
			});
		}
		await (member.roles as GuildMemberRoleManager).remove(role.id);

		await interaction.reply({
			content: `Removed <@&${role.id}> from <@!${user.id}>.`,
		});
	},
} as Command;
