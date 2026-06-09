import { Config } from '../app';
import { Error, Loader, Sweet, Toastr } from '../utils';
export class Errors {
    constructor(op, res) {
        this.op = op;
        this.res = res;
    }
    static handle(op, res) {
        if (Config.app_env) {
            console.log('error options:', op);
            console.log('error response:', res);
        }
        if (res) {
            switch (res?.type) {
                case 'error':
                    this.error(op, res);
                    break;
                case 'wrong':
                    this.wrong(op, res);
                    break;
                case 'bigError':
                    this.bigError(op, res);
                    break;
                case 'noData':
                    this.noData(op, res);
                    break;
                case 'validation':
                    this.validation(op, res);
                    break;
                default:
                    this.noData(op, res);
                    break;
            }
        }
        return;
    }
    static error(op, res) {
        if (op) {
            if (res?.tost) {
                Sweet.tost.error({ html: res?.message });
            }
            if (res?.sweet) {
                Sweet.error({ html: res?.message });
            }
            if (res?.toastr) {
                Toastr.error(res?.message);
            }
        }
    }
    static wrong(op, res) {
        if (op) {
            if (res?.tost) {
                Sweet.tost.warning({ html: res?.message });
            }
            if (res?.sweet) {
                Sweet.warning({ html: res?.message });
            }
            if (res?.toastr) {
                Toastr.warning(res?.message);
            }
        }
    }
    static bigError(op, res) {
        if (op && res?.bigError) {
            Error.bigErrors(res);
        }
    }
    static noData(op, res) {
        this.wrong(op, res);
    }
    static validation(op, res) {
        if (res?.errors && op) {
            Loader.showErrors(res?.errors);
        }
    }
}
//# sourceMappingURL=errors.js.map