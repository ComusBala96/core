import { AppConfig } from '../types';
export declare class Errors {
    op: AppConfig;
    res: Record<string, any>;
    constructor(op: AppConfig, res: Record<string, any>);
    static handle<T extends typeof Errors>(this: T, op: AppConfig, res: Record<string, any>): void;
    static error(op: AppConfig, res: Record<string, any>): void;
    static wrong(op: AppConfig, res: Record<string, any>): void;
    static bigError(op: AppConfig, res: Record<string, any>): void;
    static noData(op: AppConfig, res: Record<string, any>): void;
    static validation(op: AppConfig, res: Record<string, any>): void;
}
//# sourceMappingURL=errors.d.ts.map