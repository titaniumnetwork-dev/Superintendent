import { createEvent } from "seyfert";

export default createEvent({
	data: {
		name: "threadCreate",
	},
	async run(thread, client,) {
		const messages = await thread.messages.list({ limit: 1 });
		const firstMsg = messages[0];
		if (!firstMsg) {
			return;
		}

		firstMsg.react("👍");
		firstMsg.react("👎");

		client.logger.info(`Added reactions to first message in thread '${thread.id}'`);
	},
});
