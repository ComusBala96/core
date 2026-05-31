import { Config } from '../app';
import { AppConfig } from '../types';
import { Error, Loader, Sweet, Toastr } from '../utils';

export class Errors {
    public op: AppConfig;
    public res: Record<string, any>;
    constructor(op: AppConfig, res: Record<string, any>) {
        this.op = op;
        this.res = res;
    }

    static handle<T extends typeof Errors>(this: T, op: AppConfig, res: Record<string, any>): void {
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
    static error(op: AppConfig, res: Record<string, any>) {
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
    static wrong(op: AppConfig, res: Record<string, any>) {
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
    static bigError(op: AppConfig, res: Record<string, any>) {
        if (op && res?.bigError) {
            Error.bigErrors(res);
        }
    }
    static noData(op: AppConfig, res: Record<string, any>) {
        this.wrong(op, res);
    }
    static validation(op: AppConfig, res: Record<string, any>) {
        if (res?.errors && !op?.validation) {
            Loader.showErrors(res?.errors);
        }
    }
}
