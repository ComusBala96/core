/**
 *  Guards Definitions
 */
import { Lang } from '../../../app';
import { Str } from '../../classes';
import { error } from '../alerts';
import { getElementById } from '../dom';
/**
 * It is used for checking the null.
 * @param value unknown.
 * @return boolean | undefined.
 */
export function isNull(value) {
    return value === null || value === undefined;
}
/**
 * It is used for checking the string.
 * @param value unknown.
 * @return boolean.
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * It is used for checking the number.
 * @param value unknown.
 * @return boolean.
 */
export function isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value);
}
/**
 * It is used for checking the boolean.
 * @param value unknown.
 * @return boolean.
 */
export function isBoolean(value) {
    return typeof value === 'boolean';
}
/**
 * It is used for checking the array.
 * @param value unknown.
 * @return boolean.
 */
export function isArray(value) {
    return Array.isArray(value);
}
/**
 * It is used for checking the object.
 * @param value unknown.
 * @return boolean.
 */
export function isObject(obj) {
    return Object.keys(obj).length > 0 && typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}
/**
 * It is used for checking the function.
 * @param args any[].
 * @param value unknown.
 * @return boolean.
 */
export function isFunction(value) {
    return typeof value === 'function';
}
/**
 * It is used for checking the element.
 * @param value unknown.
 * @return boolean.
 */
export function isElement(value) {
    return value instanceof HTMLElement;
}
/**
 * It is used for checking the empty.
 * @param value unknown.
 * @return boolean.
 */
export function isEmpty(value) {
    if (isNull(value))
        return true;
    if (isString(value))
        return value.trim() === '';
    if (isArray(value))
        return value.length === 0;
    if (isObject(value))
        return Object.keys(value).length === 0;
    return false;
}
/**
 * It is used for checking the promise.
 * @param value unknown.
 * @return boolean.
 */
export function isPromise(value) {
    return !!value && typeof value.then === 'function';
}
/**
 * It is used for checking the valid url.
 * @param value unknown.
 * @return boolean.
 */
export function isValidUrl(value) {
    try {
        new URL(value);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * It is used for checking the dynamic segment.
 * @param segment string.
 * @return boolean.
 */
export function isDynamicSegment(segment) {
    return /^\{.+\??\}$/.test(segment) || /^:.+\??$/.test(segment);
}
/**
 * It is used for checking the optional segment.
 * @param segment string.
 * @return boolean.
 */
export function isOptionalSegment(segment) {
    return /^\{.+\?\}$/.test(segment) || /^:.+\?$/.test(segment);
}
/**
 * It is used for checking the wildcard segment.
 * @param segment string.
 * @return boolean.
 */
export function isWildcardSegment(segment) {
    return segment === '*';
}
export function isPlugin(plugin) {
    return typeof plugin === 'object' && plugin !== null;
}
/**
 * Connection Error.
 */
export function hasInternet() {
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
export function hasElement(id) {
    const el = getElementById(id);
    return el.length > 0;
}
export function domElement(element) {
    return $(Str.getSelector(element)).length > 0;
}
//# sourceMappingURL=guards.js.map