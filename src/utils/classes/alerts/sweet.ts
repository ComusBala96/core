import { SweetAlertOptions, SweetAlertResult, SweetAlertToastOptions, SweetBaseOptions, SweetConfirmOptions, SweetDeleteConfirmOptions, SweetLoadingOptions } from '../../../types';
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
    static success(op: SweetBaseOptions = {}): Promise<SweetAlertResult<any>> {
        return success(op);
    }

    /**
     * Error modal
     */
    static error(op: SweetBaseOptions = {}): Promise<SweetAlertResult<any>> {
        return error(op);
    }

    /**
     * Warning modal
     */
    static warning(op: SweetBaseOptions = {}): Promise<SweetAlertResult<any>> {
        return warning(op);
    }

    /**
     * Info modal
     */
    static info(op: SweetBaseOptions = {}): Promise<SweetAlertResult<any>> {
        return info(op);
    }

    /**
     * Question modal
     */
    static question(op: SweetBaseOptions = {}): Promise<SweetAlertResult<any>> {
        return question(op);
    }

    /**
     * Confirmation modal
     */
    static confirm(op: SweetConfirmOptions = {}): Promise<SweetAlertResult<any>> {
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
    static loading(op: SweetLoadingOptions = {}): Promise<SweetAlertResult<any>> {
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
    static validationErrors(errors: Record<string, string[] | string>, op: SweetBaseOptions = {}): Promise<SweetAlertResult<any>> {
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
    static xhrError(op: SweetBaseOptions = {}): Promise<SweetAlertResult<any>> {
        return xhrError(op);
    }

    static tost = {
        /**
         * Toast notification
         */
        tost(op: SweetAlertToastOptions = {}): Promise<SweetAlertResult<any>> {
            return tost(op);
        },

        /**
         * Shortcut to success toast
         */
        success(op: SweetAlertToastOptions): Promise<SweetAlertResult<any>> {
            return tostSuccess(op);
        },

        /**
         * Shortcut to error toast
         */
        error(op: SweetAlertToastOptions = {}): Promise<SweetAlertResult<any>> {
            return tostError(op);
        },

        /**
         * Shortcut to warning toast
         */
        warning(op: SweetAlertToastOptions = {}): Promise<SweetAlertResult<any>> {
            return tostWarning(op);
        },

        /**
         * Shortcut to info toast
         */
        info(op: SweetAlertToastOptions = {}): Promise<SweetAlertResult<any>> {
            return tostInfo(op);
        },
    };
}
