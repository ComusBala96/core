import { Config } from "../app";
import { AppConfig } from "../types";
import { Error, Sweet } from "../utils";

export class Errors {
    public op: AppConfig;
    public res: Record<string, any>;
    constructor(op: AppConfig, res: Record<string, any>) {
        this.op = op;
        this.res = res;
    }

    static handle<T extends typeof Errors>(this: T, op: AppConfig, res: Record<string, any>): T {
        if (Config.app_env) {
            console.log('error op', op);
            console.log('error response', res);
        }
        if (res?.noUpdate) {
            Sweet.success({ html: res?.title })
        }
        if (res?.bigError) {
            Error.validateErrors(res.errors)
        }
        if (res?.wrong) {
            Sweet.error({ html: res?.title })
        }
        return this;
    }
}