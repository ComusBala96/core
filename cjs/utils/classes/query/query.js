"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const helpers_1 = require("../../helpers");
class Query {
    static parseUrl(input) {
        return (0, helpers_1.parseUrl)(input);
    }
    static getParam(key, fallback = null) {
        return (0, helpers_1.getParam)(key, fallback);
    }
    static hasParam(key) {
        return (0, helpers_1.hasParam)(key);
    }
    static setUrl(key, value, replace = true) {
        (0, helpers_1.setUrl)(key, value, replace);
    }
    static removeUrl(key, replace = true) {
        (0, helpers_1.removeUrl)(key, replace);
    }
    static mergeUrl(data, replace = true) {
        (0, helpers_1.mergeUrl)(data, replace);
    }
    static stringify(data) {
        return (0, helpers_1.stringify)(data);
    }
    static commit(url, replace) {
        (0, helpers_1.commit)(url, replace);
    }
}
exports.Query = Query;
//# sourceMappingURL=query.js.map