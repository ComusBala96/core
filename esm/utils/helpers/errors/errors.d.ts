import { AppConfig } from '../../../types';
/**
 * Server Error.
 */
export declare function noServer(): void;
export declare function validateErrors(errors: Record<string, string[]>): void;
export declare function bigErrors(res: Record<string, any[]>): void;
export declare function noUpdate(op: AppConfig): void;
export declare function xhrErrors(xhr: any): void;
export declare function displayAllErrors(op: AppConfig): void;
//# sourceMappingURL=errors.d.ts.map