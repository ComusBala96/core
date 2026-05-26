import { deepGet, getDataAttr, getValidationMessages, getNestedValue, jsonParse, merge, mergePayload } from '../../helpers';

export class Obj {
    static merge<T extends Record<string, any>, U extends Record<string, any>>(a: T, b: U): T & U {
        return merge(a, b);
    }

    static deepGet(obj: Record<string, any>, path: string, fallback: any = undefined) {
        return deepGet(obj, path, fallback);
    }
    static getNestedValue(path: string, object: Record<string, any>): any {
        return getNestedValue(path, object);
    }
    static mergePayload(data: Record<string, any>, payload: Record<string, any> = {}): Record<string, any> {
        return mergePayload(data, payload);
    }
    static getDataAttr(element: string): Record<string, unknown> {
        return getDataAttr(element);
    }
    static jsonParse(data: string): Record<string, any> {
        return jsonParse(data);
    }
    static getValidationMessages(rules: Record<string, any>) {
        return getValidationMessages(rules);
    }
}
