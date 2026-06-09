"use strict";
/**
 * Toastr Definitions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toastrConfig = void 0;
exports.toastrInit = toastrInit;
exports.toastrReset = toastrReset;
exports.toastrSuccess = toastrSuccess;
exports.toastrError = toastrError;
exports.toastrWarning = toastrWarning;
exports.toastrInfo = toastrInfo;
exports.toastrClear = toastrClear;
exports.toastrRemove = toastrRemove;
const tslib_1 = require("tslib");
const toastr_1 = tslib_1.__importDefault(require("toastr"));
/**
 * Toastr alerts
 */
exports.toastrConfig = {
    closeButton: true,
    progressBar: true,
    newestOnTop: true,
    preventDuplicates: true,
    timeOut: 600,
    extendedTimeOut: 1000,
    positionClass: 'toast-top-right',
    showDuration: 300,
    hideDuration: 600,
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
};
/**
 * Initialize toastr options
 */
function toastrInit() {
    toastr_1.default.options = exports.toastrConfig;
}
/**
 * Reset to default config
 */
function toastrReset() {
    toastrInit();
}
/**
 * Success toast
 */
function toastrSuccess(message, title = 'Success', config = {}) {
    toastrInit();
    toastr_1.default.success(message, title, config);
}
/**
 * Error toast
 */
function toastrError(message, title = 'Error', config = {}) {
    toastrInit();
    toastr_1.default.error(message, title, config);
}
/**
 * Warning toast
 */
function toastrWarning(message, title = 'Warning', config = {}) {
    toastrInit();
    toastr_1.default.warning(message, title, config);
}
/**
 * Info toast
 */
function toastrInfo(message, title = 'Info', config = {}) {
    toastrInit();
    toastr_1.default.info(message, title, config);
}
/**
 * Clear all toasts
 */
function toastrClear() {
    toastr_1.default.clear();
}
/**
 * Remove all toasts immediately
 */
function toastrRemove() {
    toastr_1.default.remove();
}
//# sourceMappingURL=toast.js.map