/**
 * Toastr Definitions.
 */

import { ToastrConfig } from '../../../types';
import toastr from 'toastr';

/**
 * Toastr alerts
 */
export const toastrConfig: ToastrConfig = {
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
export function toastrInit(): void {
    toastr.options = toastrConfig;
}

/**
 * Reset to default config
 */
export function toastrReset(): void {
    toastrInit();
}

/**
 * Success toast
 */
export function toastrSuccess(message: string, title = 'Success', config: ToastrConfig = {}): void {
    toastrInit();
    toastr.success(message, title, config);
}

/**
 * Error toast
 */
export function toastrError(message: string, title = 'Error', config: ToastrConfig = {}): void {
    toastrInit();
    toastr.error(message, title, config);
}

/**
 * Warning toast
 */
export function toastrWarning(message: string, title = 'Warning', config: ToastrConfig = {}): void {
    toastrInit();
    toastr.warning(message, title, config);
}

/**
 * Info toast
 */
export function toastrInfo(message: string, title = 'Info', config: ToastrConfig = {}): void {
    toastrInit();
    toastr.info(message, title, config);
}

/**
 * Clear all toasts
 */
export function toastrClear(): void {
    toastr.clear();
}

/**
 * Remove all toasts immediately
 */
export function toastrRemove(): void {
    toastr.remove();
}
