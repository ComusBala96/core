import { ajaxError, close, confirm, deleteConfirm, error, fire, hideLoading, info, loading, question, showLoading, success, tost, tostError, tostInfo, tostSuccess, tostWarning, validationErrors, warning, xhrError, } from '../../helpers';
export class Sweet {
    /**
     * Raw fire passthrough
     */
    static fire(op) {
        return fire(op);
    }
    /**
     * Success modal
     */
    static success(op = {}) {
        return success(op);
    }
    /**
     * Error modal
     */
    static error(op = {}) {
        return error(op);
    }
    /**
     * Warning modal
     */
    static warning(op = {}) {
        return warning(op);
    }
    /**
     * Info modal
     */
    static info(op = {}) {
        return info(op);
    }
    /**
     * Question modal
     */
    static question(op = {}) {
        return question(op);
    }
    /**
     * Confirmation modal
     */
    static confirm(op = {}) {
        return confirm(op);
    }
    /**
     * Delete confirmation modal
     */
    static deleteConfirm(op) {
        return deleteConfirm(op);
    }
    /**
     * Loading modal
     */
    static loading(op = {}) {
        return loading(op);
    }
    /**
     * Close current modal
     */
    static close() {
        return close();
    }
    /**
     * Show loading inside existing modal
     */
    static showLoading() {
        return showLoading();
    }
    /**
     * Hide loading inside existing modal
     */
    static hideLoading() {
        return hideLoading();
    }
    /**
     * Validation error
     */
    static validationErrors(errors, op = {}) {
        return validationErrors(errors, op);
    }
    /**
     * ajax Error
     */
    static ajaxError(e) {
        return ajaxError(e);
    }
    /**
     * XHR Error
     */
    static xhrError(op = {}) {
        return xhrError(op);
    }
}
Sweet.tost = {
    /**
     * Toast notification
     */
    tost(op = {}) {
        return tost(op);
    },
    /**
     * Shortcut to success toast
     */
    success(op) {
        return tostSuccess(op);
    },
    /**
     * Shortcut to error toast
     */
    error(op = {}) {
        return tostError(op);
    },
    /**
     * Shortcut to warning toast
     */
    warning(op = {}) {
        return tostWarning(op);
    },
    /**
     * Shortcut to info toast
     */
    info(op = {}) {
        return tostInfo(op);
    },
};
//# sourceMappingURL=sweet.js.map