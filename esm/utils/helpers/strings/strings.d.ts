/**
 * String Definitions.
 */
/**
 * Make a custom slug.
 */
export declare function slug(value: string, separator?: string): string;
export declare function getExportValue(value: string | number): string | number;
/**
 * Make a camel case string.
 */
export declare function camel(value: string): string;
/**
 * Make a pascal case string.
 */
export declare function pascal(value: string): string;
/**
 * Make a snake case string.
 */
export declare function snake(value: string): string;
/**
 * Make a _ case string.
 */
export declare function kebab(value: string): string;
/**
 * Parse sentence case.
 */
export declare function title(value: string): string;
/**
 * Parse first letter uppercase.
 */
export declare function ucfirst(value: string): string;
/**
 * Limit sentence length.
 */
export declare function limit(value: string, length?: number, end?: string): string;
/**
 * generate random string.
 */
export declare function random(length?: number): string;
/**
 * get _ file name.
 */
export declare function makeExportName(file: string): string;
/**
 * Replace name into _ case.
 */
export declare function sanitizeVarName(name: string): string;
/**
 * Split array into chunk size.
 */
export declare function splitArray<T>(arr: T[], chunkSize: number): T[][];
/**
 * Remove html tags from string.
 */
export declare function escapeHtml(value: unknown): string;
/**
 * Normalize url path.
 */
export declare function normalize(path: string): string;
/**
 * Join url path.
 */
export declare function join(...parts: string[]): string;
/**
 * Split url path.
 */
export declare function split(path: string): string[];
/**
 * Get param name.
 */
export declare function getParamName(segment: string): string | null;
/**
 * Normalize name by removing common prefixes/suffixes.
 */
export declare function normalizeName(name: string): string;
export declare function getSelector(selector: string): string;
//# sourceMappingURL=strings.d.ts.map