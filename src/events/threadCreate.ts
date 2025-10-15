import { Events } from "discord.js";

import type { Event } from "../events/index.ts";
import { createSubLogger } from "../logger.ts";

export default {
    name: Events.ThreadCreate,
    execute: async (thread, newlyCreated, logger) => {
        const evLogger = createSubLogger(logger, "Thread Create");

        if (newlyCreated) {
            const messages = await thread.messages.fetch();
            const firstMsg = messages.first();
            if (!firstMsg) {
                return;
            }

            firstMsg.react("👍");
            firstMsg.react("👎");

            evLogger.info(`Added reactions to first message in thread '${thread.id}'`);
        }
    },
} as Event<Events.ThreadCreate>;