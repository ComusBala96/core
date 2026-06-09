import { hasElement, hasInternet, isArray, isBoolean, isDynamicSegment, isElement, isEmpty, isFunction, isNull, isNumber, isObject, isOptionalSegment, isPlugin, isPromise, isString, isValidUrl, isWildcardSegment, domElement, } from '../../helpers';
export class Guard {
    static isNull(value) {
        return isNull(value);
    }
    static isString(value) {
        return isString(value);
    }
    static isNumber(value) {
        return isNumber(value);
    }
    static isBoolean(value) {
        return isBoolean(value);
    }
    static isArray(value) {
        return isArray(value);
    }
    static isObject(obj) {
        return isObject(obj);
    }
    static isFunction(value) {
        return isFunction(value);
    }
    static isElement(value) {
        return isElement(value);
    }
    static isEmpty(value) {
        return isEmpty(value);
    }
    static isPromise(value) {
        return isPromise(value);
    }
    static isValidUrl(value) {
        return isValidUrl(value);
    }
    static isDynamicSegment(segment) {
        return isDynamicSegment(segment);
    }
    static isOptionalSegment(segment) {
        return isOptionalSegment(segment);
    }
    static isWildcardSegment(segment) {
        return isWildcardSegment(segment);
    }
    static isPlugin(plugin) {
        return isPlugin(plugin);
    }
    static hasElement(id) {
        return hasElement(id);
    }
    static hasInternet() {
        return hasInternet();
    }
    static domElement(element) {
        return domElement(element);
    }
}
//# sourceMappingURL=guard.js.map