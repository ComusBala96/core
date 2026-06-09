/**
 * Query Definitions
 */
/**
 * Parse the search params.
 */
export declare function parseUrl<T extends Record<string, any> = Record<string, any>>(input?: string): T;
/**
 * Get the param.
 */
export declare function getParam(key: string, fallback?: string | null): string | null;
/**
 * Check the key is exist or not?.
 */
export declare function hasParam(key: string): boolean;
/**
 * Insert the url location into history.
 */
export declare function setUrl(key: string, value: string, replace?: boolean): void;
/**
 * Remove the url location from history.
 */
export declare function removeUrl(key: string, replace?: boolean): void;
/**
 * Merge the url location into history.
 */
export declare function mergeUrl(data: Record<string, any>, replace?: boolean): void;
/**
 * Stringify the params.
 */
export declare function stringify(data: Record<string, any>): string;
/**
 * Commit the url location into history.
 */
export declare function commit(url: URL, replace: boolean): void;
//# sourceMappingURL=query.d.ts.map