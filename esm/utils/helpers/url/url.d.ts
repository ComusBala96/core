/**
 * URL Definitions.
 */
import { Api } from 'datatables.net';
/**
 * Get current url.
 */
export declare function current(path?: string): string;
/**
 * Timeout Reload.
 */
export declare function reloadTimeout(time?: number | null): void;
/**
 * Timeout Redirect.
 */
export declare function redirectTimeout(path: string | null, time?: number | null): void;
/**
 * Reload.
 */
export declare function reload(): void;
/**
 * Redirect.
 */
export declare function redirect(path: string | null): void;
export declare function reloadTable(api: Api): void;
//# sourceMappingURL=url.d.ts.map