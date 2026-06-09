import { commit, getParam, hasParam, mergeUrl, parseUrl, removeUrl, setUrl, stringify } from "../../helpers";
export class Query {
    static parseUrl(input) {
        return parseUrl(input);
    }
    static getParam(key, fallback = null) {
        return getParam(key, fallback);
    }
    static hasParam(key) {
        return hasParam(key);
    }
    static setUrl(key, value, replace = true) {
        setUrl(key, value, replace);
    }
    static removeUrl(key, replace = true) {
        removeUrl(key, replace);
    }
    static mergeUrl(data, replace = true) {
        mergeUrl(data, replace);
    }
    static stringify(data) {
        return stringify(data);
    }
    static commit(url, replace) {
        commit(url, replace);
    }
}
//# sourceMappingURL=query.js.map