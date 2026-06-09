"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Obj = void 0;
const helpers_1 = require("../../helpers");
class Obj {
    static merge(a, b) {
        return (0, helpers_1.merge)(a, b);
    }
    static deepGet(obj, path, fallback = undefined) {
        return (0, helpers_1.deepGet)(obj, path, fallback);
    }
    static getNestedValue(path, object) {
        return (0, helpers_1.getNestedValue)(path, object);
    }
    static mergePayload(data, payload = {}) {
        return (0, helpers_1.mergePayload)(data, payload);
    }
    static getDataAttr(element) {
        return (0, helpers_1.getDataAttr)(element);
    }
    static jsonParse(data) {
        return (0, helpers_1.jsonParse)(data);
    }
    static getValidationMessages(rules) {
        return (0, helpers_1.getValidationMessages)(rules);
    }
}
exports.Obj = Obj;
//# sourceMappingURL=objects.js.map