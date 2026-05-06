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
    timeOut: 3000,
    extendedTimeOut: 1000,
    positionClass: 'toast-bottom-right',
    showDuration: 300,
    hideDuration: 300,
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
};

/**
 * Initialize toastr options
 */
export function toastrInit(config: ToastrConfig = {}): void {
    toastr.options = {
        ...toastrConfig,
        ...config,
    };
}

/**
 * Reset to default config
 */
export function toastrReset(): void {
    toastrInit(toastrConfig);
}

/**
 * Success toast
 */
export function toastrSuccess(message: string, title = 'Success', config: ToastrConfig = {}): void {
    toastrInit(config);
    toastr.success(message, title);
}

/**
 * Error toast
 */
export function toastrError(message: string, title = 'Error', config: ToastrConfig = {}): void {
    toastrInit(config);
    toastr.error(message, title);
}

/**
 * Warning toast
 */
export function toastrWarning(message: string, title = 'Warning', config: ToastrConfig = {}): void {
    toastrInit(config);
    toastr.warning(message, title);
}

/**
 * Info toast
 */
export function toastrInfo(message: string, title = 'Info', config: ToastrConfig = {}): void {
    toastrInit(config);
    toastr.info(message, title);
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
