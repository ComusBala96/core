/**
 * Objects Definitions
 */

import { Lang } from '../../../app';
import { LangOptions } from '../../../types';
import { getElementById } from '../dom';

/**
 * Merge objects
 */
export function merge<T extends Record<string, any>, U extends Record<string, any>>(a: T, b: U): T & U {
    return { ...a, ...b };
}

/**
 * Get deeper object value.
 */
export function deepGet(obj: Record<string, any>, path: string, fallback: any = undefined) {
    return path.split('.').reduce((acc, key) => (acc?.[key] !== undefined ? acc[key] : fallback), obj);
}

/**
 * Get nested object values.
 */
export function getNestedValue(path: string, object: Record<string, any>): any {
    return path.split('.').reduce((o, i) => (o ? o[i] : undefined), object);
}
/**
 * Get messages from Form rules.
 */
export function getValidationMessages(rules: Record<string, any>) {
    const messages: Record<string, any> = {};
    const langObj: Record<string, any> = {};
    Object.values(rules).forEach((rule: any) => {
        Object.values(rule).forEach((value: any) => {
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

export function getLangBags(op: LangOptions = {}) {
    const ob: Record<string, string> = {};
    const lang = Lang.validation;
    for (const langKey in lang) {
        const langElement = lang[langKey];
        if (typeof langElement === 'object') {
            for (const key in langElement) {
                const element = String(langElement[key]);
                ob[key] = Lang.getMatchedString(element, op);
            }
        } else if (typeof langElement === 'string') {
            ob[langKey] = Lang.getMatchedString(langElement, op);
        }
    }
    return ob;
}

export function mergePayload(data: Record<string, any>, payload: Record<string, any> = {}): Record<string, any> {
    return Object.keys(payload).length ? merge(data, payload) : data;
}

export function getDataAttr(element: string): Record<string, unknown> {
    const el = getElementById(element);
    let payload: Record<string, unknown> = {};
    const dataAttr: string = el.attr('data-payload');
    if (dataAttr) {
        try {
            payload = jsonParse(dataAttr);
        } catch {
            payload = {};
        }
    }
    return payload;
}

export function jsonParse(data: string): Record<string, any> {
    return JSON.parse(data) ?? {};
}
