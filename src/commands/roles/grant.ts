import {
	type CommandContext,
	createRoleOption,
	createUserOption,
	Declare,
	Options,
	SubCommand,
} from "seyfert";
import { MessageFlags } from "seyfert/lib/types";
import db from "@/db";

const options = {
	user: createUserOption({
		description: "User to grant the role to",
		required: true,
	}),
	role: createRoleOption({
		description: "Role to grant",
		required: true,
	}),
};

@Declare({
	name: "grant",
	description: "Grant an allowed role to a user.",
	contexts: ["Guild"],
})
@Options(options)
export default class GrantCommand extends SubCommand {
	async run(ctx: CommandContext<typeof options>) {
		const guild = await ctx.guild();
		if (!guild) {
			return ctx.editOrReply({
				content: "This command can only be used in a guild.",
				flags: MessageFlags.Ephemeral,
			});
		}
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
}
