/**
 * Toastr Definitions.
 */
import { ToastrConfig } from '../../../types';
/**
 * Toastr alerts
 */
export declare const toastrConfig: ToastrConfig;
/**
 * Initialize toastr options
 */
export declare function toastrInit(): void;
/**
 * Reset to default config
 */
export declare function toastrReset(): void;
/**
 * Success toast
 */
export declare function toastrSuccess(message: string, title?: string, config?: ToastrConfig): void;
/**
 * Error toast
 */
export declare function toastrError(message: string, title?: string, config?: ToastrConfig): void;
/**
 * Warning toast
 */
export declare function toastrWarning(message: string, title?: string, config?: ToastrConfig): void;
/**
 * Info toast
 */
export declare function toastrInfo(message: string, title?: string, config?: ToastrConfig): void;
/**
 * Clear all toasts
 */
export declare function toastrClear(): void;
/**
 * Remove all toasts immediately
 */
export declare function toastrRemove(): void;
//# sourceMappingURL=toast.d.ts.map