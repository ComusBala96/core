"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jquery_js_1 = tslib_1.__importDefault(require("../jquery/jquery.js"));
if (typeof window !== 'undefined') {
    window.$ = jquery_js_1.default;
    window.jQuery = jquery_js_1.default;
}
require("jquery-validation/dist/jquery.validate.js");
require("jquery-validation/dist/additional-methods.js");
require("jquery-datetimepicker/build/jquery.datetimepicker.full.js");
exports.default = jquery_js_1.default;
//# sourceMappingURL=plugins.js.map