import { Declare, Options, Command, type CommandContext } from "seyfert";
import { createUserOption, createRoleOption } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";
import db from "@/db";

const options = {
	user: createUserOption({
		description: "User to remove the role from",
		required: true,
	}),
	role: createRoleOption({
		description: "Role to remove",
		required: true,
	}),
}

@Declare({
  name: "revoke",
  description: "Remove a granted role from a user."
})
@Options(options)
export default class RevokeCommand extends Command {
	async run(ctx: CommandContext<typeof options>) {
		const guild = await ctx.guild();
		if (!guild) {
			return ctx.editOrReply({
				content: "This command can only be used in a guild.",
				flags: MessageFlags.Ephemeral,
			});
		};
		const user = ctx.options.user;
		const role = ctx.options.role;
		if (!db.allowed_roles.includes(role.id)) {
			return ctx.editOrReply({
				content: "Role not allowed.",
				flags: MessageFlags.Ephemeral,
			});
		}
		await guild.members.removeRole(user.id, role.id);

		await ctx.editOrReply({
			content: `Removed <@&${role.id}> from <@!${user.id}>.`,
		});
	}
};
