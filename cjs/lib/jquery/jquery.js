"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ = void 0;
const tslib_1 = require("tslib");
const jquery_1 = tslib_1.__importDefault(require("jquery"));
const $ = jquery_1.default;
exports.$ = $;
if (typeof window !== 'undefined') {
    window.$ = $;
    window.jQuery = $;
}
exports.default = $;
//# sourceMappingURL=jquery.js.map