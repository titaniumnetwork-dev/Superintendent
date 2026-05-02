import { type CommandContext, createRoleOption, Declare, Options, SubCommand } from "seyfert";
import db, { saveDB } from "@/db";

const options = {
	role: createRoleOption({
		description: "Role to allow",
		required: true,
	}),
};
@Declare({
	name: "allow",
	description: "Allow a role to be granted.",
	contexts: ["Guild"],
})
@Options(options)
export default class AllowCommand extends SubCommand {
	async run(ctx: CommandContext<typeof options>) {
		const role = ctx.options.role;
		db.allowed_roles.push(role.id);
		saveDB();
		await ctx.editOrReply({
			content: `Added <@&${role.id}> to allowed roles.`,
		});
	}
}
