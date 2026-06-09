"use strict";
/**
 * SweetAlert2 Definitions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.fire = fire;
exports.success = success;
exports.error = error;
exports.warning = warning;
exports.info = info;
exports.question = question;
exports.confirm = confirm;
exports.deleteConfirm = deleteConfirm;
exports.loading = loading;
exports.close = close;
exports.showLoading = showLoading;
exports.hideLoading = hideLoading;
exports.tost = tost;
exports.tostSuccess = tostSuccess;
exports.tostError = tostError;
exports.tostWarning = tostWarning;
exports.tostInfo = tostInfo;
exports.validationErrors = validationErrors;
exports.ajaxError = ajaxError;
exports.xhrError = xhrError;
const tslib_1 = require("tslib");
const sweetalert2_1 = tslib_1.__importDefault(require("sweetalert2"));
const app_1 = require("../../../app");
/**
 * Raw fire passthrough
 */
function fire(op) {
    return sweetalert2_1.default.fire(op);
}
/**
 * Success modal
 */
function success(op = {}) {
    return fire({ icon: 'success', title: app_1.Lang.sweet.success.title, text: app_1.Lang.sweet.success.text, confirmButtonText: app_1.Lang.sweet.ok, ...op });
}
/**
 * Error modal
 */
function error(op = {}) {
    return fire({ icon: 'error', title: app_1.Lang.sweet.error.title, text: app_1.Lang.sweet.error.text, confirmButtonText: app_1.Lang.sweet.ok, ...op });
}
/**
 * Warning modal
 */
function warning(op = {}) {
    return fire({ icon: 'warning', title: app_1.Lang.sweet.warning.title, text: app_1.Lang.sweet.warning.text, confirmButtonText: app_1.Lang.sweet.ok, ...op });
}
/**
 * Info modal
 */
function info(op = {}) {
    return fire({ icon: 'info', title: app_1.Lang.sweet.info.title, text: app_1.Lang.sweet.info.text, confirmButtonText: app_1.Lang.sweet.ok, ...op });
}
/**
 * Question modal
 */
function question(op = {}) {
    return fire({ icon: 'question', title: app_1.Lang.sweet.question.title, text: app_1.Lang.sweet.question.text, confirmButtonText: app_1.Lang.sweet.ok, ...op });
}
/**
 * Confirmation modal
 */
function confirm(op = {}) {
    return fire({
        icon: 'question',
        title: app_1.Lang.sweet.confirm.title,
        text: app_1.Lang.sweet.confirm.text,
        showCancelButton: true,
        confirmButtonText: app_1.Lang.sweet.yes,
        cancelButtonText: app_1.Lang.sweet.cancel,
        ...op,
    });
}
/**
 * Delete confirmation modal
 */
function deleteConfirm(op) {
    const { item, ...rest } = op;
    return fire({
        icon: 'warning',
        title: app_1.Lang.sweet.delete.title,
        html: app_1.Lang.sweet.delete.text.replace(':item', item),
        showCancelButton: true,
        confirmButtonText: app_1.Lang.sweet.destroy,
        cancelButtonText: app_1.Lang.sweet.cancel,
        confirmButtonColor: '#d33',
        ...rest,
    });
}
/**
 * Loading modal
 */
function loading(op = {}) {
    return fire({
        title: app_1.Lang.sweet.loading.title,
        text: app_1.Lang.sweet.loading.text,
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
            showLoading();
        },
        ...op,
    });
}
/**
 * Close current modal
 */
function close() {
    sweetalert2_1.default.close();
}
/**
 * Show loading inside existing modal
 */
function showLoading() {
    sweetalert2_1.default.showLoading();
}
/**
 * Hide loading inside existing modal
 */
function hideLoading() {
    sweetalert2_1.default.hideLoading();
}
/**
 * Toast notification
 */
function tost(op = {}) {
    return fire({
        toast: true,
        timerProgressBar: true,
        showConfirmButton: false,
        ...op,
    });
}
/**
 * Shortcut to success toast
 */
function tostSuccess(op) {
    return tost({ icon: 'success', title: app_1.Lang.sweet.success.title, text: app_1.Lang.sweet.success.text, ...op });
}
/**
 * Shortcut to error toast
 */
function tostError(op = {}) {
    return tost({ icon: 'error', title: app_1.Lang.sweet.error.title, text: app_1.Lang.sweet.error.text, ...op });
}
/**
 * Shortcut to warning toast
 */
function tostWarning(op = {}) {
    return tost({ icon: 'warning', title: app_1.Lang.sweet.warning.title, text: app_1.Lang.sweet.warning.text, ...op });
}
/**
 * Shortcut to info toast
 */
function tostInfo(op = {}) {
    return tost({ icon: 'info', title: app_1.Lang.sweet.info.title, text: app_1.Lang.sweet.info.text, ...op });
}
/**
 * Validation error
 */
function validationErrors(errors, op = {}) {
    const html = Object.entries(errors)
        .map(([field, messages]) => {
        const list = Array.isArray(messages) ? messages : [messages];
        return `
                    <div style="text-align:left;margin-bottom:10px;">
                        <strong>${field}</strong>
                        <ul style="margin:5px 0 0 18px;padding:0;">
                            ${list.map((msg) => `<li>${msg}</li>`).join('')}
                        </ul>
                    </div>
                `;
    })
        .join('');
    return fire({
        icon: 'error',
        title: 'Validation Error',
        html,
        ...op,
    });
}
/**
 * ajax Error
 */
function ajaxError(e) {
    const response = e?.response;
    const data = response?.data;
    if (response?.status === 422 && data?.errors) {
        return validationErrors(data.errors);
    }
    if (data?.message) {
        return error({ html: data.message });
    }
    return error();
}
/**
 * XHR Error
 */
function xhrError(op = {}) {
    return error(op);
}
//# sourceMappingURL=sweet.js.map