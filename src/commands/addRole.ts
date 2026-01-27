import { Declare, Options, Command, type CommandContext } from "seyfert";
import { createRoleOption } from "seyfert";
import db, { saveDB } from "@/db";

const options = {
	role: createRoleOption({
		description: "Role to allow",
		required: true,
	}),
};
@Declare({
	name: "addrole",
  	description: "Allow a role to be granted."
})
@Options(options)
export default class AddRoleCommand extends Command {
	async run(ctx: CommandContext<typeof options>) {
		const role = ctx.options.role;
		db.allowed_roles.push(role.id);
		saveDB();
		await ctx.editOrReply({
			content: `Added <@&${role.id}> to allowed roles.`,
		});
	}
};
