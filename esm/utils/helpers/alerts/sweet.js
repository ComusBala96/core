/**
 * SweetAlert2 Definitions.
 */
import Swal from 'sweetalert2';
import { Lang } from '../../../app';
/**
 * Raw fire passthrough
 */
export function fire(op) {
    return Swal.fire(op);
}
/**
 * Success modal
 */
export function success(op = {}) {
    return fire({ icon: 'success', title: Lang.sweet.success.title, text: Lang.sweet.success.text, confirmButtonText: Lang.sweet.ok, ...op });
}
/**
 * Error modal
 */
export function error(op = {}) {
    return fire({ icon: 'error', title: Lang.sweet.error.title, text: Lang.sweet.error.text, confirmButtonText: Lang.sweet.ok, ...op });
}
/**
 * Warning modal
 */
export function warning(op = {}) {
    return fire({ icon: 'warning', title: Lang.sweet.warning.title, text: Lang.sweet.warning.text, confirmButtonText: Lang.sweet.ok, ...op });
}
/**
 * Info modal
 */
export function info(op = {}) {
    return fire({ icon: 'info', title: Lang.sweet.info.title, text: Lang.sweet.info.text, confirmButtonText: Lang.sweet.ok, ...op });
}
/**
 * Question modal
 */
export function question(op = {}) {
    return fire({ icon: 'question', title: Lang.sweet.question.title, text: Lang.sweet.question.text, confirmButtonText: Lang.sweet.ok, ...op });
}
/**
 * Confirmation modal
 */
export function confirm(op = {}) {
    return fire({
        icon: 'question',
        title: Lang.sweet.confirm.title,
        text: Lang.sweet.confirm.text,
        showCancelButton: true,
        confirmButtonText: Lang.sweet.yes,
        cancelButtonText: Lang.sweet.cancel,
        ...op,
    });
}
/**
 * Delete confirmation modal
 */
export function deleteConfirm(op) {
    const { item, ...rest } = op;
    return fire({
        icon: 'warning',
        title: Lang.sweet.delete.title,
        html: Lang.sweet.delete.text.replace(':item', item),
        showCancelButton: true,
        confirmButtonText: Lang.sweet.destroy,
        cancelButtonText: Lang.sweet.cancel,
        confirmButtonColor: '#d33',
        ...rest,
    });
}
/**
 * Loading modal
 */
export function loading(op = {}) {
    return fire({
        title: Lang.sweet.loading.title,
        text: Lang.sweet.loading.text,
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
export function close() {
    Swal.close();
}
/**
 * Show loading inside existing modal
 */
export function showLoading() {
    Swal.showLoading();
}
/**
 * Hide loading inside existing modal
 */
export function hideLoading() {
    Swal.hideLoading();
}
/**
 * Toast notification
 */
export function tost(op = {}) {
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
export function tostSuccess(op) {
    return tost({ icon: 'success', title: Lang.sweet.success.title, text: Lang.sweet.success.text, ...op });
}
/**
 * Shortcut to error toast
 */
export function tostError(op = {}) {
    return tost({ icon: 'error', title: Lang.sweet.error.title, text: Lang.sweet.error.text, ...op });
}
/**
 * Shortcut to warning toast
 */
export function tostWarning(op = {}) {
    return tost({ icon: 'warning', title: Lang.sweet.warning.title, text: Lang.sweet.warning.text, ...op });
}
/**
 * Shortcut to info toast
 */
export function tostInfo(op = {}) {
    return tost({ icon: 'info', title: Lang.sweet.info.title, text: Lang.sweet.info.text, ...op });
}
/**
 * Validation error
 */
export function validationErrors(errors, op = {}) {
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
export function ajaxError(e) {
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
export function xhrError(op = {}) {
    return error(op);
}
//# sourceMappingURL=sweet.js.map