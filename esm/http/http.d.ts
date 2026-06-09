import { AppConfig } from '../types';
export declare class Http {
    static ajax: {
        send(op: AppConfig, callBack?: undefined | ((op: AppConfig, res: Record<string, any>) => void)): void;
        handleCallback(op: AppConfig, callBack?: undefined | ((op: AppConfig, res: Record<string, any>) => void)): void;
        response(op: AppConfig, res: Record<string, any>, callBack?: (op: AppConfig, res: Record<string, any>) => void): void;
        core(op: AppConfig, callBack: (op: AppConfig, res: Record<string, any>) => void): void;
    };
    static axios: {
        core(): void;
        make(): void;
        send(): void;
    };
}
//# sourceMappingURL=http.d.ts.map