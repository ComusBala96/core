import { AppConfig } from '../types';
export declare class Success {
    static handle<T extends typeof Success>(this: T, op: AppConfig, res: Record<string, any>): void;
    static success<T extends typeof Success>(this: T, op: AppConfig, res: Record<string, any>): void;
    static warning<T extends typeof Success>(this: T, op: AppConfig, res: Record<string, any>): void;
    static noUpdate<T extends typeof Success>(this: T, op: AppConfig, res: Record<string, any>): void;
    static load_view<T extends typeof Success>(this: T, op: AppConfig, res: Record<string, any>): void;
    static handleTransaction<T extends typeof Success>(this: T, op: AppConfig, res: Record<string, any>): void;
}
//# sourceMappingURL=success.d.ts.map