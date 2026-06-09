"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toastr = void 0;
const helpers_1 = require("../../helpers");
class Toastr {
    /**
     * Initialize toastr options
     */
    static init() {
        (0, helpers_1.toastrInit)();
    }
    /**
     * Reset to default config
     */
    static reset() {
        (0, helpers_1.toastrReset)();
    }
    /**
     * Success toast
     */
    static success(message, title = 'Success', config = {}) {
        (0, helpers_1.toastrSuccess)(message, title, config);
    }
    /**
     * Error toast
     */
    static error(message, title = 'Error', config = {}) {
        (0, helpers_1.toastrError)(message, title, config);
    }
    /**
     * Warning toast
     */
    static warning(message, title = 'Warning', config = {}) {
        (0, helpers_1.toastrWarning)(message, title, config);
    }
    /**
     * Info toast
     */
    static info(message, title = 'Info', config = {}) {
        (0, helpers_1.toastrInfo)(message, title, config);
    }
    /**
     * Clear all toasts
     */
    static clear() {
        (0, helpers_1.toastrClear)();
    }
    /**
     * Remove all toasts immediately
     */
    static remove() {
        (0, helpers_1.toastrRemove)();
    }
}
exports.Toastr = Toastr;
//# sourceMappingURL=toastr.js.map