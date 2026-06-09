"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sweet = void 0;
const helpers_1 = require("../../helpers");
class Sweet {
    /**
     * Raw fire passthrough
     */
    static fire(op) {
        return (0, helpers_1.fire)(op);
    }
    /**
     * Success modal
     */
    static success(op = {}) {
        return (0, helpers_1.success)(op);
    }
    /**
     * Error modal
     */
    static error(op = {}) {
        return (0, helpers_1.error)(op);
    }
    /**
     * Warning modal
     */
    static warning(op = {}) {
        return (0, helpers_1.warning)(op);
    }
    /**
     * Info modal
     */
    static info(op = {}) {
        return (0, helpers_1.info)(op);
    }
    /**
     * Question modal
     */
    static question(op = {}) {
        return (0, helpers_1.question)(op);
    }
    /**
     * Confirmation modal
     */
    static confirm(op = {}) {
        return (0, helpers_1.confirm)(op);
    }
    /**
     * Delete confirmation modal
     */
    static deleteConfirm(op) {
        return (0, helpers_1.deleteConfirm)(op);
    }
    /**
     * Loading modal
     */
    static loading(op = {}) {
        return (0, helpers_1.loading)(op);
    }
    /**
     * Close current modal
     */
    static close() {
        return (0, helpers_1.close)();
    }
    /**
     * Show loading inside existing modal
     */
    static showLoading() {
        return (0, helpers_1.showLoading)();
    }
    /**
     * Hide loading inside existing modal
     */
    static hideLoading() {
        return (0, helpers_1.hideLoading)();
    }
    /**
     * Validation error
     */
    static validationErrors(errors, op = {}) {
        return (0, helpers_1.validationErrors)(errors, op);
    }
    /**
     * ajax Error
     */
    static ajaxError(e) {
        return (0, helpers_1.ajaxError)(e);
    }
    /**
     * XHR Error
     */
    static xhrError(op = {}) {
        return (0, helpers_1.xhrError)(op);
    }
}
exports.Sweet = Sweet;
Sweet.tost = {
    /**
     * Toast notification
     */
    tost(op = {}) {
        return (0, helpers_1.tost)(op);
    },
    /**
     * Shortcut to success toast
     */
    success(op) {
        return (0, helpers_1.tostSuccess)(op);
    },
    /**
     * Shortcut to error toast
     */
    error(op = {}) {
        return (0, helpers_1.tostError)(op);
    },
    /**
     * Shortcut to warning toast
     */
    warning(op = {}) {
        return (0, helpers_1.tostWarning)(op);
    },
    /**
     * Shortcut to info toast
     */
    info(op = {}) {
        return (0, helpers_1.tostInfo)(op);
    },
};
//# sourceMappingURL=sweet.js.map