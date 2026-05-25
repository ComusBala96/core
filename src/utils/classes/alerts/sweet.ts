import { SweetDeleteConfirmOptions } from '../../../types';
import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import {
    ajaxError,
    close,
    confirm,
    deleteConfirm,
    error,
    fire,
    hideLoading,
    info,
    loading,
    question,
    showLoading,
    success,
    tost,
    tostError,
    tostInfo,
    tostSuccess,
    tostWarning,
    validationErrors,
    warning,
    xhrError,
} from '../../helpers';

export class Sweet {
    /**
     * Raw fire passthrough
     */
    static fire(op: SweetAlertOptions): Promise<SweetAlertResult<any>> {
        return fire(op);
    }

    /**
     * Success modal
     */
    static success(op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
        return success(op);
    }

    /**
     * Error modal
     */
    static error(op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
        return error(op);
    }

    /**
     * Warning modal
     */
    static warning(op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
        return warning(op);
    }

    /**
     * Info modal
     */
    static info(op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
        return info(op);
    }

    /**
     * Question modal
     */
    static question(op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
        return question(op);
    }

    /**
     * Confirmation modal
     */
    static confirm(op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
        return confirm(op);
    }

    /**
     * Delete confirmation modal
     */
    static deleteConfirm(op: SweetDeleteConfirmOptions): Promise<SweetAlertResult<any>> {
        return deleteConfirm(op);
    }

    /**
     * Loading modal
     */
    static loading(op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
        return loading(op);
    }

    /**
     * Close current modal
     */
    static close(): void {
        return close();
    }

    /**
     * Show loading inside existing modal
     */
    static showLoading(): void {
        return showLoading();
    }

    /**
     * Hide loading inside existing modal
     */
    static hideLoading(): void {
        return hideLoading();
    }

    /**
     * Validation error
     */
    static validationErrors(errors: Record<string, string[] | string>, op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
        return validationErrors(errors, op);
    }

    /**
     * ajax Error
     */
    static ajaxError(e: any): Promise<SweetAlertResult<any>> {
        return ajaxError(e);
    }

    /**
     * XHR Error
     */
    static xhrError(op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
        return xhrError(op);
    }

    static tost = {
        /**
         * Toast notification
         */
        tost(op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
            return tost(op);
        },

        /**
         * Shortcut to success toast
         */
        success(op: SweetAlertOptions): Promise<SweetAlertResult<any>> {
            return tostSuccess(op);
        },

        /**
         * Shortcut to error toast
         */
        error(op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
            return tostError(op);
        },

        /**
         * Shortcut to warning toast
         */
        warning(op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
            return tostWarning(op);
        },

        /**
         * Shortcut to info toast
         */
        info(op: SweetAlertOptions = {}): Promise<SweetAlertResult<any>> {
            return tostInfo(op);
        },
    };
}
