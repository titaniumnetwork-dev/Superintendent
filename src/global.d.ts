import type { ParseClient, Client } from "seyfert";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string;
			DB_FILE: string;
		}
	}

	/** Types for `@formatjs/intl-durationformat` NPM package. */
	namespace Intl {
		/** Duration formatting interface. */
		interface DurationFormat {
			/**
			 * Format a duration object into a string.
			 * @param duration Duration components to format.
			 * @return Formatted duration string.
			 */
			format(duration: {
				years?: number;
				months?: number;
				weeks?: number;
				days?: number;
				hours?: number;
				minutes?: number;
				seconds?: number;
			}): string;
		}

		/** Constructor interface for `DurationFormat`. */
		interface DurationFormatConstructor {
			/**
			 * Create a new `DurationFormat` instance.
			 * @param locales Locale string or array.
			 * @param options Formatting options.
			 */
			new (
				locales?: string | string[],
				options?: {
					style?: "long" | "short" | "narrow" | "digital";
					fractionalDigits?: number;
				}
			): DurationFormat;
		}

		/** Duration format constructor. */
		const DurationFormat: DurationFormatConstructor;
	}
}

declare module 'seyfert' {
    interface UsingClient extends ParseClient<Client<true>> { }
}

export {};
