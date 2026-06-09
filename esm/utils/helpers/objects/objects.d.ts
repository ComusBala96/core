/**
 * Objects Definitions
 */
import { LangOptions } from '../../../types';
/**
 * Merge objects
 */
export declare function merge<T extends Record<string, any>, U extends Record<string, any>>(a: T, b: U): T & U;
/**
 * Get deeper object value.
 */
export declare function deepGet(obj: Record<string, any>, path: string, fallback?: any): Record<string, any>;
/**
 * Get nested object values.
 */
export declare function getNestedValue(path: string, object: Record<string, any>): any;
/**
 * Get messages from Form rules.
 */
export declare function getValidationMessages(rules: Record<string, any>): Record<string, any>;
export declare function getLangBags(op?: LangOptions): Record<string, string>;
export declare function mergePayload(data: Record<string, any>, payload?: Record<string, any>): Record<string, any>;
export declare function getDataAttr(element: string): Record<string, unknown>;
export declare function jsonParse(data: string): Record<string, any>;
//# sourceMappingURL=objects.d.ts.map