import { toastrClear, toastrError, toastrInfo, toastrInit, toastrRemove, toastrReset, toastrSuccess, toastrWarning } from "../../helpers";
export class Toastr {
    /**
     * Initialize toastr options
     */
    static init() {
        toastrInit();
    }
    /**
     * Reset to default config
     */
    static reset() {
        toastrReset();
    }
    /**
     * Success toast
     */
    static success(message, title = 'Success', config = {}) {
        toastrSuccess(message, title, config);
    }
    /**
     * Error toast
     */
    static error(message, title = 'Error', config = {}) {
        toastrError(message, title, config);
    }
    /**
     * Warning toast
     */
    static warning(message, title = 'Warning', config = {}) {
        toastrWarning(message, title, config);
    }
    /**
     * Info toast
     */
    static info(message, title = 'Info', config = {}) {
        toastrInfo(message, title, config);
    }
    /**
     * Clear all toasts
     */
    static clear() {
        toastrClear();
    }
    /**
     * Remove all toasts immediately
     */
    static remove() {
        toastrRemove();
    }
}
//# sourceMappingURL=toastr.js.map