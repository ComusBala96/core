"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
const helpers_1 = require("../../helpers");
class Loader {
    static show(id = 'theGlobalLoader') {
        return (0, helpers_1.showLoader)(id);
    }
    static hide(id = 'theGlobalLoader') {
        return (0, helpers_1.hideLoader)(id);
    }
    static showErrors(errors) {
        return (0, helpers_1.validationShow)(errors);
    }
    static displayErrors(id, html) {
        return (0, helpers_1.displayErrors)(id, html);
    }
}
exports.Loader = Loader;
//# sourceMappingURL=loader.js.map