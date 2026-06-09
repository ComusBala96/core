"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guard = void 0;
const helpers_1 = require("../../helpers");
class Guard {
    static isNull(value) {
        return (0, helpers_1.isNull)(value);
    }
    static isString(value) {
        return (0, helpers_1.isString)(value);
    }
    static isNumber(value) {
        return (0, helpers_1.isNumber)(value);
    }
    static isBoolean(value) {
        return (0, helpers_1.isBoolean)(value);
    }
    static isArray(value) {
        return (0, helpers_1.isArray)(value);
    }
    static isObject(obj) {
        return (0, helpers_1.isObject)(obj);
    }
    static isFunction(value) {
        return (0, helpers_1.isFunction)(value);
    }
    static isElement(value) {
        return (0, helpers_1.isElement)(value);
    }
    static isEmpty(value) {
        return (0, helpers_1.isEmpty)(value);
    }
    static isPromise(value) {
        return (0, helpers_1.isPromise)(value);
    }
    static isValidUrl(value) {
        return (0, helpers_1.isValidUrl)(value);
    }
    static isDynamicSegment(segment) {
        return (0, helpers_1.isDynamicSegment)(segment);
    }
    static isOptionalSegment(segment) {
        return (0, helpers_1.isOptionalSegment)(segment);
    }
    static isWildcardSegment(segment) {
        return (0, helpers_1.isWildcardSegment)(segment);
    }
    static isPlugin(plugin) {
        return (0, helpers_1.isPlugin)(plugin);
    }
    static hasElement(id) {
        return (0, helpers_1.hasElement)(id);
    }
    static hasInternet() {
        return (0, helpers_1.hasInternet)();
    }
    static domElement(element) {
        return (0, helpers_1.domElement)(element);
    }
}
exports.Guard = Guard;
//# sourceMappingURL=guard.js.map