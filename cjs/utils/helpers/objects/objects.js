"use strict";
/**
 * Objects Definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = merge;
exports.deepGet = deepGet;
exports.getNestedValue = getNestedValue;
exports.getValidationMessages = getValidationMessages;
exports.getLangBags = getLangBags;
exports.mergePayload = mergePayload;
exports.getDataAttr = getDataAttr;
exports.jsonParse = jsonParse;
const app_1 = require("../../../app");
const dom_1 = require("../dom");
/**
 * Merge objects
 */
function merge(a, b) {
    return { ...a, ...b };
}
/**
 * Get deeper object value.
 */
function deepGet(obj, path, fallback = undefined) {
    return path.split('.').reduce((acc, key) => (acc?.[key] !== undefined ? acc[key] : fallback), obj);
}
/**
 * Get nested object values.
 */
function getNestedValue(path, object) {
    return path.split('.').reduce((o, i) => (o ? o[i] : undefined), object);
}
/**
 * Get messages from Form rules.
 */
function getValidationMessages(rules) {
    const messages = {};
    const langObj = {};
    Object.values(rules).forEach((rule) => {
        Object.values(rule).forEach((value) => {
            const digits = app_1.Lang.digits?.[value];
            if (digits !== undefined) {
                langObj.digits = digits;
            }
            const attributes = app_1.Lang.attributes?.[value];
            if (attributes !== undefined) {
                langObj.attributes = attributes;
            }
        });
    });
    Object.keys(rules).forEach((key) => {
        messages[key] = getLangBags(langObj);
    });
    return messages;
}
function getLangBags(op = {}) {
    const ob = {};
    const lang = app_1.Lang.validation;
    for (const langKey in lang) {
        const langElement = lang[langKey];
        if (typeof langElement === 'object') {
            for (const key in langElement) {
                const element = String(langElement[key]);
                ob[key] = app_1.Lang.getMatchedString(element, op);
            }
        }
        else if (typeof langElement === 'string') {
            ob[langKey] = app_1.Lang.getMatchedString(langElement, op);
        }
    }
    return ob;
}
function mergePayload(data, payload = {}) {
    return Object.keys(payload).length ? merge(data, payload) : data;
}
function getDataAttr(element) {
    const el = (0, dom_1.getElementById)(element);
    let payload = {};
    const dataAttr = el.attr('data-payload');
    if (dataAttr) {
        try {
            payload = jsonParse(dataAttr);
        }
        catch {
            payload = {};
        }
    }
    return payload;
}
function jsonParse(data) {
    return JSON.parse(data) ?? {};
}
//# sourceMappingURL=objects.js.map