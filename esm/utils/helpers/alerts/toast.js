/**
 * Toastr Definitions.
 */
import toastr from 'toastr';
/**
 * Toastr alerts
 */
export const toastrConfig = {
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
export function toastrInit() {
    toastr.options = toastrConfig;
}
/**
 * Reset to default config
 */
export function toastrReset() {
    toastrInit();
}
/**
 * Success toast
 */
export function toastrSuccess(message, title = 'Success', config = {}) {
    toastrInit();
    toastr.success(message, title, config);
}
/**
 * Error toast
 */
export function toastrError(message, title = 'Error', config = {}) {
    toastrInit();
    toastr.error(message, title, config);
}
/**
 * Warning toast
 */
export function toastrWarning(message, title = 'Warning', config = {}) {
    toastrInit();
    toastr.warning(message, title, config);
}
/**
 * Info toast
 */
export function toastrInfo(message, title = 'Info', config = {}) {
    toastrInit();
    toastr.info(message, title, config);
}
/**
 * Clear all toasts
 */
export function toastrClear() {
    toastr.clear();
}
/**
 * Remove all toasts immediately
 */
export function toastrRemove() {
    toastr.remove();
}
//# sourceMappingURL=toast.js.map