/**
 * @fileoverview Logger factory utilities for creating the main tslog instance and sub‑loggers.
 */

import type { ILogObj } from "tslog";
import { Logger } from "tslog";

/**
 * Resolves the minimum log level from a string into the numeric level expected by tslog.
 *
 * @param input Log level string. Defaults to "info".
 * @return Numeric minLevel compatible with tslog.
 */
function resolveMinLevel(input?: string): number {
	const level = (input || "info").toLowerCase();

	if (level === "debug") {
		return 0;
	}
	if (level === "info") {
		return 1;
	}
	if (level === "warn") {
		return 2;
	}
	if (level === "error") {
		return 3;
	}

	return 1;
}

/**
 * Creates the main logger named "Bot" with minimal formatting.
 *
 * @param env Environment variable object with `LOG_LEVEL` to configure verbosity.
 * @return Configured tslog Logger instance.
 */
export function createMainLogger(env?: { LOG_LEVEL?: string }): Logger<ILogObj> {
	const minLevel = resolveMinLevel(env?.LOG_LEVEL ?? process.env.LOG_LEVEL);

	return new Logger<ILogObj>({
		name: "Bot",
		minLevel,
	});
}

/**
 * Creates a sub‑logger from a parent logger with a human‑readable name.
 *
 * @param parent Parent logger to derive the sub‑logger from.
 * @param name Sub‑logger name identifying its context.
 * @return Derived sub‑logger.
 */
export function createSubLogger(parent: Logger<ILogObj>, name: string): Logger<ILogObj> {
	return parent.getSubLogger({ name });
}
