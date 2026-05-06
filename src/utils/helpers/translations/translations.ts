/**
 * Translation Definitions.
 */

import { Config } from "../../../app";

/**
 * Convert English → Bangla Number
 * @param input The number to be translated
 * @example trans_number(123) => "১২৩" if locale is not 'en', otherwise returns 123
 * @return The translated number
 */
export function trans_number(input: number | string): string | number {
    if (Config.locale !== 'en') {
        const map: Record<string, string> = {
            '0': '০',
            '1': '১',
            '2': '২',
            '3': '৩',
            '4': '৪',
            '5': '৫',
            '6': '৬',
            '7': '৭',
            '8': '৮',
            '9': '৯',
        };
        const number = input
            .toString()
            .split('')
            .map((char) => map[char] ?? char)
            .join('');
        return number;
    }
    return input;
}
