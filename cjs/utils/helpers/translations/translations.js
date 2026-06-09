"use strict";
/**
 * Translation Definitions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.trans_number = trans_number;
const app_1 = require("../../../app");
/**
 * Convert English → Bangla Number
 * @param input The number to be translated
 * @example trans_number(123) => "১২৩" if locale is not 'en', otherwise returns 123
 * @return The translated number
 */
function trans_number(input) {
    if (app_1.Config.locale !== 'en') {
        const map = {
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
//# sourceMappingURL=translations.js.map