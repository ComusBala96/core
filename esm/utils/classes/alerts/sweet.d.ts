import { SweetDeleteConfirmOptions } from '../../../types';
import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
export declare class Sweet {
    /**
     * Raw fire passthrough
     */
    static fire(op: SweetAlertOptions): Promise<SweetAlertResult<any>>;
    /**
     * Success modal
     */
    static success(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
    /**
     * Error modal
     */
    static error(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
    /**
     * Warning modal
     */
    static warning(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
    /**
     * Info modal
     */
    static info(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
    /**
     * Question modal
     */
    static question(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
    /**
     * Confirmation modal
     */
    static confirm(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
    /**
     * Delete confirmation modal
     */
    static deleteConfirm(op: SweetDeleteConfirmOptions): Promise<SweetAlertResult<any>>;
    /**
     * Loading modal
     */
    static loading(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
    /**
     * Close current modal
     */
    static close(): void;
    /**
     * Show loading inside existing modal
     */
    static showLoading(): void;
    /**
     * Hide loading inside existing modal
     */
    static hideLoading(): void;
    /**
     * Validation error
     */
    static validationErrors(errors: Record<string, string[] | string>, op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
    /**
     * ajax Error
     */
    static ajaxError(e: any): Promise<SweetAlertResult<any>>;
    /**
     * XHR Error
     */
    static xhrError(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
    static tost: {
        /**
         * Toast notification
         */
        tost(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
        /**
         * Shortcut to success toast
         */
        success(op: SweetAlertOptions): Promise<SweetAlertResult<any>>;
        /**
         * Shortcut to error toast
         */
        error(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
        /**
         * Shortcut to warning toast
         */
        warning(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
        /**
         * Shortcut to info toast
         */
        info(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
    };
}
//# sourceMappingURL=sweet.d.ts.map