/**
 * @fileoverview Slash command for displaying bot uptime information.
 */

import {
	ApplicationIntegrationType,
	EmbedBuilder,
	InteractionContextType,
	SlashCommandBuilder,
} from "discord.js";
import type { ILogObj, Logger } from "tslog";

import type { Command } from "./index.ts";

/** Slash command for displaying bot uptime information. */
export default {
	data: new SlashCommandBuilder()
		.setName("uptime")
		.setDescription("Display bot uptime.")
		.setIntegrationTypes(
			ApplicationIntegrationType.GuildInstall,
			ApplicationIntegrationType.UserInstall
		)
		.setContexts(
			InteractionContextType.Guild,
			InteractionContextType.BotDM,
			InteractionContextType.PrivateChannel
		),

	/**
	 * Executes the uptime command.
	 * @param interaction Discord slash command interaction.
	 * @param logger A sublogger.
	 */
	async execute(interaction, logger: Logger<ILogObj>) {
		const ephemeral = interaction.options.getBoolean("ephemeral") ?? false;

		const uptimeSeconds = Math.floor(process.uptime());

		const uptimeString = new Intl.DurationFormat("en", {
			style: "narrow",
		}).format({
			days: Math.floor(uptimeSeconds / 86400),
			hours: Math.floor((uptimeSeconds % 86400) / 3600),
			minutes: Math.floor((uptimeSeconds % 3600) / 60),
			seconds: uptimeSeconds % 60,
		});

		logger.debug("Giving the user the uptime of:", uptimeString);

		const embed = new EmbedBuilder()
			.setTitle("Uptime")
			.setDescription(`ProxyGuard has been running for: \`${uptimeString}\``)

		await interaction.reply({ embeds: [embed], ephemeral });
	},
} as Command;
