import { Declare, Options, Command, type CommandContext } from "seyfert";
import { createUserOption, createRoleOption } from "seyfert";
import db from "@/db";
import { MessageFlags } from "seyfert/lib/types";

const options = {
	user: createUserOption({
		description: "User to grant the role to",
		required: true,
	}),
	role: createRoleOption({
		description: "Role to grant",
		required: true,
	}),
}

@Declare({
  name: "grant",
  description: "Grant an allowed role to a user.",
  contexts: ["Guild"]
})
@Options(options)
export default class GrantCommand extends Command {
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
		await guild.members.addRole(user.id, role.id);

		await ctx.editOrReply({
			content: `Granted <@&${role.id}> to <@!${user.id}>.`,
		});
	}
};
