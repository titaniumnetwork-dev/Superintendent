import db from "@/db";
import { type CommandContext, createRoleOption, createUserOption, Declare, Options, SubCommand } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";

const options = {
	user: createUserOption({
		description: "User to revoke the role from",
		required: true,
	}),
	role: createRoleOption({
		description: "Role to revoke",
		required: true,
	}),
}

@Declare({
	name: "revoke",
	description: "Revoke a granted role from a user.",
	contexts: ["Guild"]
})
@Options(options)
export default class RevokeCommand extends SubCommand {
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
