"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
const app_1 = require("../app");
const utils_1 = require("../utils");
class Errors {
    constructor(op, res) {
        this.op = op;
        this.res = res;
    }
    static handle(op, res) {
        if (app_1.Config.app_env) {
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
                utils_1.Sweet.tost.error({ html: res?.message });
            }
            if (res?.sweet) {
                utils_1.Sweet.error({ html: res?.message });
            }
            if (res?.toastr) {
                utils_1.Toastr.error(res?.message);
            }
        }
    }
    static wrong(op, res) {
        if (op) {
            if (res?.tost) {
                utils_1.Sweet.tost.warning({ html: res?.message });
            }
            if (res?.sweet) {
                utils_1.Sweet.warning({ html: res?.message });
            }
            if (res?.toastr) {
                utils_1.Toastr.warning(res?.message);
            }
        }
    }
    static bigError(op, res) {
        if (op && res?.bigError) {
            utils_1.Error.bigErrors(res);
        }
    }
    static noData(op, res) {
        this.wrong(op, res);
    }
    static validation(op, res) {
        if (res?.errors && op) {
            utils_1.Loader.showErrors(res?.errors);
        }
    }
}
exports.Errors = Errors;
//# sourceMappingURL=errors.js.map