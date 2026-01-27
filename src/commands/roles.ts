import { Declare, Command, type CommandContext } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";
import db from "@/db";
@Declare({
  name: "roles",
  description: "List all allowed roles."
})
export default class RolesCommand extends Command  {
	async execute(ctx: CommandContext) {
		const list = db.allowed_roles.map((r) => `<@&${r}>`).join("\n") || "**No roles configured**";

		await ctx.editOrReply({
			content: `Allowed roles:\n${list}`,
			flags: MessageFlags.Ephemeral,
		});
	}
}
