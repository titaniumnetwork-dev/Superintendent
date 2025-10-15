/**
 * @fileoverview Loads structures from a directory.
 */

import type { PathLike } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { URL } from "node:url";

import type { ILogObj, Logger } from "tslog";

import { type Command, predicate as commandPredicate } from "../commands/index.ts";
import { type Event, predicate as eventPredicate } from "../events/index.ts";
import { createSubLogger } from "../logger.ts";

/** Type for structure validation predicates. */
export type StructurePredicate<T> = (structure: Partial<T>) => structure is T;

/**
 * Load structures from a directory using a predicate function.
 * @param dir Directory to load structures from.
 * @param predicate Function to validate loaded structures.
 * @param recursive Whether to recursively load from subdirectories.
 * @param logger A sublogger.
 * @return Validated structures from the directory.
 */
export async function loadStructures<T>(
	dir: PathLike,
	predicate: StructurePredicate<T>,
	recursive = true,
	logger: Logger<ILogObj>
): Promise<T[]> {
	const statDir = await stat(dir);
	if (!statDir.isDirectory()) {
		throw new Error(`The directory '${dir}' is not a directory.`);
	}

	const files = await readdir(dir);

	const structures: T[] = [];

	for (const file of files) {
		if (file === "index.ts" || !file.endsWith(".ts")) {
			continue;
		}

		const statFile = await stat(new URL(`${dir}${file}`));
		if (statFile.isDirectory() && recursive) {
			structures.push(...(await loadStructures(`${dir}${file}`, predicate, recursive, logger)));
			continue;
		}

		const structure = (await import(`${dir}${file}`)).default;
		const loaderLogger = createSubLogger(logger, "Loader");

		if (predicate(structure)) {
			structures.push(structure);
			loaderLogger.debug(`Loaded valid structure from '${file}'`);
		} else {
			loaderLogger.warn(`Skipped invalid structure at '${file}' - failed predicate validation`);
		}
	}

	return structures;
}

/**
 * Load commands from a directory and return them as a Map.
 * @param dir Directory to load commands from.
 * @param recursive Whether to recursively load from subdirectories.
 * @param logger A sublogger.
 * @return Map of command names to Command objects.
 */
export async function loadCommands(
	dir: PathLike,
	recursive = true,
	logger: Logger<ILogObj>
): Promise<Map<string, Command>> {
	const structures = await loadStructures(dir, commandPredicate, recursive, logger);
	const commandMap = structures.reduce((acc, cur) => acc.set(cur.data.name, cur), new Map());

	createSubLogger(logger, "Loader").info(`Loaded ${commandMap.size} commands`);

	return commandMap;
}

/**
 * Load events from a directory.
 * @param dir Directory to load events from.
 * @param recursive Whether to recursively load from subdirectories.
 * @param logger A sublogger.
 * @return Event objects.
 */
export async function loadEvents(
	dir: PathLike,
	recursive = true,
	logger: Logger<ILogObj>
): Promise<Event[]> {
	return loadStructures(dir, eventPredicate, recursive, logger);
}
