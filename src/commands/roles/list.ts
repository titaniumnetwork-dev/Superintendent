import { type CommandContext, Declare, SubCommand } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";
import db from "@/db";
@Declare({
	name: "list",
	description: "List all allowed roles.",
	contexts: ["Guild"],
})
export default class ListCommand extends SubCommand {
	async run(ctx: CommandContext) {
		const list = db.allowed_roles.map((r) => `<@&${r}>`).join("\n") || "**No roles configured**";

		await ctx.editOrReply({
			content: `Allowed roles:\n${list}`,
			flags: MessageFlags.Ephemeral,
		});
	}
}
