import { type CommandContext, Declare, SubCommand } from "seyfert";
import { MessageFlags } from "seyfert/lib/types";
import db, { saveDB } from "@/db";
@Declare({
	name: "clear-deleted",
	description: "Clear all deleted roles from allowed roles.",
	contexts: ["Guild"],
})
export default class ClearDeletedCommand extends SubCommand {
	async run(ctx: CommandContext) {
		if (!ctx.guildId) return;

		const guildRoles = await ctx.client.roles.list(ctx.guildId);
		const existingIds = new Set(guildRoles.map((r) => r.id));

		const before = db.allowed_roles.length;
		const removed = db.allowed_roles.filter((id) => !existingIds.has(id));
		db.allowed_roles = db.allowed_roles.filter((id) => existingIds.has(id));

		if (removed.length > 0) saveDB();

		const list = db.allowed_roles.map((r) => `<@&${r}>`).join("\n") || "**No roles configured**";

		await ctx.editOrReply({
			content: `Removed ${before - db.allowed_roles.length} deleted role(s).\n\nAllowed roles:\n${list}`,
			flags: MessageFlags.Ephemeral,
		});
	}
}
