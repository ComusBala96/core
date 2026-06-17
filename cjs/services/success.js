"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Success = void 0;
const app_1 = require("../app");
const utils_1 = require("../utils");
class Success {
    static handle(op, res) {
        if (app_1.Config.app_env) {
            console.log('success options:', op);
            console.log('success response:', res);
        }
        switch (res?.type) {
            case 'success':
                this.success(op, res);
                break;
            case 'warning':
                this.warning(op, res);
                break;
            case 'noUpdate':
                this.noUpdate(op, res);
                break;
            case 'load_view':
                this.load_view(op, res);
                break;
            default:
                this.warning(op, res);
                break;
        }
        return;
    }
    static success(op, res) {
        if (res?.tost) {
            utils_1.Sweet.tost.success({ text: res?.message, timer: 600, position: 'bottom-end' });
            this.handleTransaction(op, res);
        }
        if (res?.sweet) {
            utils_1.Sweet.success({ text: res?.message });
            this.handleTransaction(op, res);
        }
        if (res?.toastr) {
            utils_1.Toastr.success(res?.message);
            this.handleTransaction(op, res);
        }
    }
    static warning(op, res) {
        if (res?.tost) {
            utils_1.Sweet.tost.warning({ text: res?.message, timer: 600, position: 'bottom-end' });
            this.handleTransaction(op, res);
        }
        if (res?.sweet) {
            utils_1.Sweet.warning({ text: res?.data?.message });
            this.handleTransaction(op, res);
        }
        if (res?.toastr) {
            utils_1.Toastr.warning(res?.data?.message);
            this.handleTransaction(op, res);
        }
    }
    static noUpdate(op, res) {
        if (res?.tost) {
            utils_1.Sweet.tost.success({ html: res?.message, timer: 600, position: 'bottom-end' });
            this.handleTransaction(op, res);
        }
        if (res?.sweet) {
            utils_1.Sweet.success({ html: res?.message });
            this.handleTransaction(op, res);
        }
        if (res?.toastr) {
            utils_1.Toastr.success($(res?.message).text());
            this.handleTransaction(op, res);
        }
    }
    static load_view(op, res) {
        if (op?.success?.load_view && typeof op?.success?.target === 'string' && utils_1.Guard.domElement(op?.success?.target)) {
            if (res?.view) {
                $(utils_1.Str.getSelector(op?.success?.target)).html(res?.view);
            }
        }
        this.success(op, res);
    }
    static handleTransaction(op, res) {
        if (res?.reload) {
            if (res?.data?.reload_timeout) {
                utils_1.Url.reloadTimeout(res?.data?.reload_timeout);
            }
            else {
                utils_1.Url.reload();
            }
        }
        if (res?.reload_table && op?.api) {
            utils_1.Url.reloadTable(op?.api);
        }
        if (res?.data?.redirect) {
            if (res?.data?.redirect_timeout || res?.toastr || res?.tost) {
                utils_1.Url.redirectTimeout(res?.data?.redirect, res?.data?.redirect_timeout ?? 1200);
            }
            else {
                utils_1.Url.redirect(res?.data?.redirect);
            }
        }
        if (res?.data?.reset && op?.element) {
            utils_1.Form.reset(op?.element);
            utils_1.Form.jodit.reset();
        }
        if (typeof op?.plugins?.jodit !== 'boolean' && op?.plugins?.jodit?.reset) {
            utils_1.Form.jodit.reset();
        }
    }
}
exports.Success = Success;
//# sourceMappingURL=success.js.map