"use strict";
/**
 *  Guards Definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNull = isNull;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isArray = isArray;
exports.isObject = isObject;
exports.isFunction = isFunction;
exports.isElement = isElement;
exports.isEmpty = isEmpty;
exports.isPromise = isPromise;
exports.isValidUrl = isValidUrl;
exports.isDynamicSegment = isDynamicSegment;
exports.isOptionalSegment = isOptionalSegment;
exports.isWildcardSegment = isWildcardSegment;
exports.isPlugin = isPlugin;
exports.hasInternet = hasInternet;
exports.hasElement = hasElement;
exports.domElement = domElement;
const app_1 = require("../../../app");
const classes_1 = require("../../classes");
const alerts_1 = require("../alerts");
const dom_1 = require("../dom");
/**
 * It is used for checking the null.
 * @param value unknown.
 * @return boolean | undefined.
 */
function isNull(value) {
    return value === null || value === undefined;
}
/**
 * It is used for checking the string.
 * @param value unknown.
 * @return boolean.
 */
function isString(value) {
    return typeof value === 'string';
}
/**
 * It is used for checking the number.
 * @param value unknown.
 * @return boolean.
 */
function isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value);
}
/**
 * It is used for checking the boolean.
 * @param value unknown.
 * @return boolean.
 */
function isBoolean(value) {
    return typeof value === 'boolean';
}
/**
 * It is used for checking the array.
 * @param value unknown.
 * @return boolean.
 */
function isArray(value) {
    return Array.isArray(value);
}
/**
 * It is used for checking the object.
 * @param value unknown.
 * @return boolean.
 */
function isObject(obj) {
    return Object.keys(obj).length > 0 && typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}
/**
 * It is used for checking the function.
 * @param args any[].
 * @param value unknown.
 * @return boolean.
 */
function isFunction(value) {
    return typeof value === 'function';
}
/**
 * It is used for checking the element.
 * @param value unknown.
 * @return boolean.
 */
function isElement(value) {
    return value instanceof HTMLElement;
}
/**
 * It is used for checking the empty.
 * @param value unknown.
 * @return boolean.
 */
function isEmpty(value) {
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
function isPromise(value) {
    return !!value && typeof value.then === 'function';
}
/**
 * It is used for checking the valid url.
 * @param value unknown.
 * @return boolean.
 */
function isValidUrl(value) {
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
function isDynamicSegment(segment) {
    return /^\{.+\??\}$/.test(segment) || /^:.+\??$/.test(segment);
}
/**
 * It is used for checking the optional segment.
 * @param segment string.
 * @return boolean.
 */
function isOptionalSegment(segment) {
    return /^\{.+\?\}$/.test(segment) || /^:.+\?$/.test(segment);
}
/**
 * It is used for checking the wildcard segment.
 * @param segment string.
 * @return boolean.
 */
function isWildcardSegment(segment) {
    return segment === '*';
}
function isPlugin(plugin) {
    return typeof plugin === 'object' && plugin !== null;
}
/**
 * Connection Error.
 */
function hasInternet() {
    if (!navigator.onLine) {
        (0, alerts_1.error)({
            html: `<span style="font-size:16px;color:#ff0101;">${app_1.Lang.errors.no_internet}</span>`,
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
function hasElement(id) {
    const el = (0, dom_1.getElementById)(id);
    return el.length > 0;
}
function domElement(element) {
    return $(classes_1.Str.getSelector(element)).length > 0;
}
//# sourceMappingURL=guards.js.map