/**
 * @fileoverview Slash command for displaying bot uptime information.
 */

import { Declare, Options, Command, type CommandContext} from "seyfert";
import { Embed } from "seyfert";
import { createBooleanOption } from "seyfert";
import { MessageFlags } from 'seyfert/lib/types';

const options = {
	ephemeral: createBooleanOption({
    	description: "Hide the command's response",
  	}),
}

@Declare({
  name: "uptime",
  description: "Display bot uptime."
})
@Options(options)
export default class UptimeCommand extends Command {
	async run(ctx: CommandContext<typeof options>) {
 		const flags = ctx.options.ephemeral ? MessageFlags.Ephemeral : undefined;

		const uptimeSeconds = Math.floor(process.uptime());

		const uptimeString = new Intl.DurationFormat("en", {
			style: "narrow",
		}).format({
			days: Math.floor(uptimeSeconds / 86400),
			hours: Math.floor((uptimeSeconds % 86400) / 3600),
			minutes: Math.floor((uptimeSeconds % 3600) / 60),
			seconds: uptimeSeconds % 60,
		});

		ctx.client.logger.debug("Giving the user the uptime of:", uptimeString);

		const embed = new Embed()
			.setTitle("Uptime")
			.setDescription(`Superintendent has been running for: \`${uptimeString}\``);

		await ctx.editOrReply({ embeds: [embed], flags });
	}
};
