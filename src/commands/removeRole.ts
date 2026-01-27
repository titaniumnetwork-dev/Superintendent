import { Declare, Options, Command, type CommandContext } from "seyfert";
import { createRoleOption } from "seyfert";
import db, { saveDB } from "@/db";

const options = {
	role: createRoleOption({
		description: "Role to disallow",
		required: true,
	}),
}
@Declare({
  name: "removerole",
  description: "Disallow a role from being granted.",
  contexts: ["Guild"]
})
@Options(options)
export default class RemoveRoleCommand extends Command {
	async run(ctx: CommandContext<typeof options>) {
		const role = ctx.options.role;
		db.allowed_roles = db.allowed_roles.filter((id) => id !== role.id);
		saveDB();
		await ctx.editOrReply({
			content: `Removed <@&${role.id}> from allowed roles.`,
		});
	}
};
