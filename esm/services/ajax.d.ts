import { AppConfig } from '../types';
export declare class Ajax {
    static make<T extends typeof Ajax>(this: T, op: AppConfig): void;
    static get<T extends typeof Ajax>(this: T, op: AppConfig): void;
    static post<T extends typeof Ajax>(this: T, op: AppConfig): void;
    static put<T extends typeof Ajax>(this: T, op: AppConfig): void;
    static delete<T extends typeof Ajax>(this: T, op: AppConfig): void;
}
//# sourceMappingURL=ajax.d.ts.map