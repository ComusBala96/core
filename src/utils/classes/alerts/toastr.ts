import { ToastrConfig } from "../../../types";
import { toastrClear, toastrError, toastrInfo, toastrInit, toastrRemove, toastrReset, toastrSuccess, toastrWarning } from "../../helpers";


export class Toastr {
    /**
     * Initialize toastr options
     */
    static init(): void {
        toastrInit();
    }

    /**
     * Reset to default config
     */
    static reset(): void {
        toastrReset();
    }

    /**
     * Success toast
     */
    static success(message: string, title = 'Success', config: ToastrConfig = {}): void {
        toastrSuccess(message, title, config);
    }

    /**
     * Error toast
     */
    static error(message: string, title = 'Error', config: ToastrConfig = {}): void {
        toastrError(message, title, config);
    }

    /**
     * Warning toast
     */
    static warning(message: string, title = 'Warning', config: ToastrConfig = {}): void {
        toastrWarning(message, title, config);
    }

    /**
     * Info toast
     */
    static info(message: string, title = 'Info', config: ToastrConfig = {}): void {
        toastrInfo(message, title, config);
    }

    /**
     * Clear all toasts
     */
    static clear(): void {
        toastrClear();
    }

    /**
     * Remove all toasts immediately
     */
    static remove(): void {
        toastrRemove();
    }
}
