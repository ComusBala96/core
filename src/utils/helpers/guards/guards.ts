/**
 *  Guards Definitions
 */

import { Lang } from '../../../app';
import { error } from '../alerts';
import { getElementById } from '../dom';

/**
 * It is used for checking the null.
 * @param value unknown.
 * @return boolean | undefined.
 */
export function isNull(value: unknown): value is null | undefined {
    return value === null || value === undefined;
}

/**
 * It is used for checking the string.
 * @param value unknown.
 * @return boolean.
 */
export function isString(value: unknown): value is string {
    return typeof value === 'string';
}

/**
 * It is used for checking the number.
 * @param value unknown.
 * @return boolean.
 */
export function isNumber(value: unknown): value is number {
    return typeof value === 'number' && !Number.isNaN(value);
}

/**
 * It is used for checking the boolean.
 * @param value unknown.
 * @return boolean.
 */
export function isBoolean(value: unknown): value is boolean {
    return typeof value === 'boolean';
}

/**
 * It is used for checking the array.
 * @param value unknown.
 * @return boolean.
 */
export function isArray<T = any>(value: unknown): value is T[] {
    return Array.isArray(value);
}

/**
 * It is used for checking the object.
 * @param value unknown.
 * @return boolean.
 */
export function isObject<T extends object = Record<string, any>>(value: unknown): value is T {
    return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * It is used for checking the function.
 * @param args any[].
 * @param value unknown.
 * @return boolean.
 */
export function isFunction<T extends (...args: any[]) => any = (...args: any[]) => any>(value: unknown): value is T {
    return typeof value === 'function';
}

/**
 * It is used for checking the element.
 * @param value unknown.
 * @return boolean.
 */
export function isElement(value: unknown): value is HTMLElement {
    return value instanceof HTMLElement;
}

/**
 * It is used for checking the empty.
 * @param value unknown.
 * @return boolean.
 */
export function isEmpty(value: unknown): boolean {
    if (isNull(value)) return true;
    if (isString(value)) return value.trim() === '';
    if (isArray(value)) return value.length === 0;
    if (isObject(value)) return Object.keys(value).length === 0;
    return false;
}

/**
 * It is used for checking the promise.
 * @param value unknown.
 * @return boolean.
 */
export function isPromise<T = any>(value: unknown): value is Promise<T> {
    return !!value && typeof (value as any).then === 'function';
}

/**
 * It is used for checking the valid url.
 * @param value unknown.
 * @return boolean.
 */
export function isValidUrl(value: string): boolean {
    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

/**
 * It is used for checking the dynamic segment.
 * @param segment string.
 * @return boolean.
 */
export function isDynamicSegment(segment: string): boolean {
    return /^\{.+\??\}$/.test(segment) || /^:.+\??$/.test(segment);
}

/**
 * It is used for checking the optional segment.
 * @param segment string.
 * @return boolean.
 */
export function isOptionalSegment(segment: string): boolean {
    return /^\{.+\?\}$/.test(segment) || /^:.+\?$/.test(segment);
}

/**
 * It is used for checking the wildcard segment.
 * @param segment string.
 * @return boolean.
 */
export function isWildcardSegment(segment: string): boolean {
    return segment === '*';
}

export function isPlugin(plugin: string[] | undefined): boolean {
    return Array.isArray(plugin) && plugin.length > 0;
}
/**
 * Connection Error.
 */
export function hasInternet(): boolean {
    if (!navigator.onLine) {
        error({
            html: `<span style="font-size:16px;color:#ff0101;">${Lang.errors.no_internet}</span>`,
            footer: 'Please check your network',
        });
        return false;
    }
    return true;
}

/**
 * It is used for checking the element.
 * @param value string.
 * @return boolean.
 */
export function hasElement(id: string): boolean {
    const el = getElementById(id);
    return el.length > 0;
}
