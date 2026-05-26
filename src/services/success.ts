import { Api } from "datatables.net";
import { Config } from "../app";
import { AppConfig } from "../types";
import { Sweet, Url } from "../utils";

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
            if (res?.reload) {
                Url.resetTable(op.api as Api);
            }
            if (res?.data?.redirect) {
                Url.redirectTimeout(res?.data?.redirect, res?.timeout ?? 1200);
            }
        }
        if (res?.sweet) {
            Sweet.success({ text: res?.data?.message })
            if (res?.reload) {
                Url.resetTable(op.api as Api);
            }
            if (res?.data?.redirect) {
                Url.redirectTimeout(res?.data?.redirect, res?.timeout ?? 1200);
            }
        }
        return this;
    }
}