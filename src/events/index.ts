/**
 * @fileoverview Event contract for Discord client event modules.
 */

import type { ClientEvents } from "discord.js";
import type { ILogObj, Logger } from "tslog";

import type { StructurePredicate } from "../util/loaders";

/** Event contract for Discord client event modules. */
export interface Event<T extends keyof ClientEvents = keyof ClientEvents> {
	/** The name of the event to listen to. */
	name: T;

	/**
	 * The function to execute when the event is triggered.
	 * @param parameters Event parameters followed by logger.
	 */
	execute: (...parameters: [...ClientEvents[T], Logger<ILogObj>]) => Promise<void> | void;

	/** Whether or not the event should only be listened to once. */
	once?: boolean;
}

/**
 * Predicate for checking if a structure is an Event.
 * @param structure Object to validate as an Event.
 * @return Whether structure is a valid Event.
 */
export const predicate: StructurePredicate<Event> = (structure): structure is Event => {
	if (!structure || typeof structure !== "object") {
		return false;
	}

	const candidate = structure as Record<PropertyKey, unknown>;

	return (
		"name" in candidate &&
		"execute" in candidate &&
		typeof candidate.name === "string" &&
		typeof candidate.execute === "function"
	);
};
