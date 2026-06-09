/**
 * SweetAlert2 Definitions.
 */
import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { SweetDeleteConfirmOptions } from '../../../types';
/**
 * Raw fire passthrough
 */
export declare function fire(op: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Success modal
 */
export declare function success(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Error modal
 */
export declare function error(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Warning modal
 */
export declare function warning(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Info modal
 */
export declare function info(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Question modal
 */
export declare function question(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Confirmation modal
 */
export declare function confirm(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Delete confirmation modal
 */
export declare function deleteConfirm(op: SweetDeleteConfirmOptions): Promise<SweetAlertResult<any>>;
/**
 * Loading modal
 */
export declare function loading(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Close current modal
 */
export declare function close(): void;
/**
 * Show loading inside existing modal
 */
export declare function showLoading(): void;
/**
 * Hide loading inside existing modal
 */
export declare function hideLoading(): void;
/**
 * Toast notification
 */
export declare function tost(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Shortcut to success toast
 */
export declare function tostSuccess(op: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Shortcut to error toast
 */
export declare function tostError(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Shortcut to warning toast
 */
export declare function tostWarning(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Shortcut to info toast
 */
export declare function tostInfo(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * Validation error
 */
export declare function validationErrors(errors: Record<string, string[] | string>, op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
/**
 * ajax Error
 */
export declare function ajaxError(e: any): Promise<SweetAlertResult<any>>;
/**
 * XHR Error
 */
export declare function xhrError(op?: SweetAlertOptions): Promise<SweetAlertResult<any>>;
//# sourceMappingURL=sweet.d.ts.map