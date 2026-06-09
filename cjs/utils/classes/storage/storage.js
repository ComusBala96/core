"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
const helpers_1 = require("../../helpers");
class LocalStorage {
    static get(key, fallback = null) {
        return (0, helpers_1.get)(key, fallback);
    }
    static set(key, value) {
        (0, helpers_1.set)(key, value);
    }
    static remove(key) {
        (0, helpers_1.remove)(key);
    }
}
exports.LocalStorage = LocalStorage;
//# sourceMappingURL=storage.js.map