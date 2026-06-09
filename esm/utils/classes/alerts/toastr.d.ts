import { ToastrConfig } from "../../../types";
export declare class Toastr {
    /**
     * Initialize toastr options
     */
    static init(): void;
    /**
     * Reset to default config
     */
    static reset(): void;
    /**
     * Success toast
     */
    static success(message: string, title?: string, config?: ToastrConfig): void;
    /**
     * Error toast
     */
    static error(message: string, title?: string, config?: ToastrConfig): void;
    /**
     * Warning toast
     */
    static warning(message: string, title?: string, config?: ToastrConfig): void;
    /**
     * Info toast
     */
    static info(message: string, title?: string, config?: ToastrConfig): void;
    /**
     * Clear all toasts
     */
    static clear(): void;
    /**
     * Remove all toasts immediately
     */
    static remove(): void;
}
//# sourceMappingURL=toastr.d.ts.map