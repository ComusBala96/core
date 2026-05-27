import { Api } from "datatables.net";
import { Config } from "../app";
import { AppConfig } from "../types";
import { Form, Sweet, Url } from "../utils";

export class Success {
    public op: AppConfig;
    public res: Record<string, any>;
    constructor(op: AppConfig, res: Record<string, any>) {
        this.op = op;
        this.res = res;
    }

    static handle<T extends typeof Success>(this: T, op: AppConfig, res: Record<string, any>): T {
        if (Config.app_env) {
            console.log('success op', op);
            console.log('success response', res);
        }
        if (res?.tost) {
            Sweet.tost.success({ text: res?.data?.message, timer: 600, position: 'bottom-end', })
            this.handleTransaction(op, res);
        }
        if (res?.sweet) {
            Sweet.success({ text: res?.data?.message })
            this.handleTransaction(op, res);
        }
        return this;
    }
    static handleTransaction<T extends typeof Success>(this: T, op: AppConfig, res: Record<string, any>): void {
        if (res?.reload) {
            if (res?.data?.reload_timeout) {
                Url.reloadTimeout(res?.data?.reload_timeout);
            } else {
                Url.reload();
            }
        }
        if (res?.table_reload) {
            Url.reloadTable(op.api as Api);
        }
        if (res?.data?.redirect) {
            Url.redirectTimeout(res?.data?.redirect, res?.timeout ?? 1200);
        }
        if (res?.data?.reset && op.element) {
            Form.reset(op?.element)
        }
    }
}