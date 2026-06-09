import { deepGet, getDataAttr, getValidationMessages, getNestedValue, jsonParse, merge, mergePayload } from '../../helpers';
export class Obj {
    static merge(a, b) {
        return merge(a, b);
    }
    static deepGet(obj, path, fallback = undefined) {
        return deepGet(obj, path, fallback);
    }
    static getNestedValue(path, object) {
        return getNestedValue(path, object);
    }
    static mergePayload(data, payload = {}) {
        return mergePayload(data, payload);
    }
    static getDataAttr(element) {
        return getDataAttr(element);
    }
    static jsonParse(data) {
        return jsonParse(data);
    }
    static getValidationMessages(rules) {
        return getValidationMessages(rules);
    }
}
//# sourceMappingURL=objects.js.map