/**
 * Objects Definitions
 */
import { Lang } from '../../../app';
import { getElementById } from '../dom';
/**
 * Merge objects
 */
export function merge(a, b) {
    return { ...a, ...b };
}
/**
 * Get deeper object value.
 */
export function deepGet(obj, path, fallback = undefined) {
    return path.split('.').reduce((acc, key) => (acc?.[key] !== undefined ? acc[key] : fallback), obj);
}
/**
 * Get nested object values.
 */
export function getNestedValue(path, object) {
    return path.split('.').reduce((o, i) => (o ? o[i] : undefined), object);
}
/**
 * Get messages from Form rules.
 */
export function getValidationMessages(rules) {
    const messages = {};
    const langObj = {};
    Object.values(rules).forEach((rule) => {
        Object.values(rule).forEach((value) => {
            const digits = Lang.digits?.[value];
            if (digits !== undefined) {
                langObj.digits = digits;
            }
            const attributes = Lang.attributes?.[value];
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
export function getLangBags(op = {}) {
    const ob = {};
    const lang = Lang.validation;
    for (const langKey in lang) {
        const langElement = lang[langKey];
        if (typeof langElement === 'object') {
            for (const key in langElement) {
                const element = String(langElement[key]);
                ob[key] = Lang.getMatchedString(element, op);
            }
        }
        else if (typeof langElement === 'string') {
            ob[langKey] = Lang.getMatchedString(langElement, op);
        }
    }
    return ob;
}
export function mergePayload(data, payload = {}) {
    return Object.keys(payload).length ? merge(data, payload) : data;
}
export function getDataAttr(element) {
    const el = getElementById(element);
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
export function jsonParse(data) {
    return JSON.parse(data) ?? {};
}
//# sourceMappingURL=objects.js.map