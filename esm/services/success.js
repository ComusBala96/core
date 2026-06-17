import { Config } from '../app';
import { Form, Guard, Str, Sweet, Toastr, Url } from '../utils';
export class Success {
    static handle(op, res) {
        if (Config.app_env) {
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
            Sweet.tost.success({ text: res?.message, timer: 600, position: 'bottom-end' });
            this.handleTransaction(op, res);
        }
        if (res?.sweet) {
            Sweet.success({ text: res?.message });
            this.handleTransaction(op, res);
        }
        if (res?.toastr) {
            Toastr.success(res?.message);
            this.handleTransaction(op, res);
        }
    }
    static warning(op, res) {
        if (res?.tost) {
            Sweet.tost.warning({ text: res?.message, timer: 600, position: 'bottom-end' });
            this.handleTransaction(op, res);
        }
        if (res?.sweet) {
            Sweet.warning({ text: res?.data?.message });
            this.handleTransaction(op, res);
        }
        if (res?.toastr) {
            Toastr.warning(res?.data?.message);
            this.handleTransaction(op, res);
        }
    }
    static noUpdate(op, res) {
        if (res?.tost) {
            Sweet.tost.success({ html: res?.message, timer: 600, position: 'bottom-end' });
            this.handleTransaction(op, res);
        }
        if (res?.sweet) {
            Sweet.success({ html: res?.message });
            this.handleTransaction(op, res);
        }
        if (res?.toastr) {
            Toastr.success($(res?.message).text());
            this.handleTransaction(op, res);
        }
    }
    static load_view(op, res) {
        if (op?.success?.load_view && typeof op?.success?.target === 'string' && Guard.domElement(op?.success?.target)) {
            if (res?.view) {
                $(Str.getSelector(op?.success?.target)).html(res?.view);
            }
        }
        this.success(op, res);
    }
    static handleTransaction(op, res) {
        if (res?.reload) {
            if (res?.data?.reload_timeout) {
                Url.reloadTimeout(res?.data?.reload_timeout);
            }
            else {
                Url.reload();
            }
        }
        if (res?.reload_table && op?.api) {
            Url.reloadTable(op?.api);
        }
        if (res?.data?.redirect) {
            if (res?.data?.redirect_timeout || res?.toastr || res?.tost) {
                Url.redirectTimeout(res?.data?.redirect, res?.data?.redirect_timeout ?? 1200);
            }
            else {
                Url.redirect(res?.data?.redirect);
            }
        }
        if (res?.data?.reset && op?.element) {
            Form.reset(op?.element);
            Form.jodit.reset();
        }
        if (typeof op?.plugins?.jodit !== 'boolean' && op?.plugins?.jodit?.reset) {
            Form.jodit.reset();
        }
    }
}
//# sourceMappingURL=success.js.map