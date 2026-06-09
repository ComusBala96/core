import { get, remove, set } from "../../helpers";
export class LocalStorage {
    static get(key, fallback = null) {
        return get(key, fallback);
    }
    static set(key, value) {
        set(key, value);
    }
    static remove(key) {
        remove(key);
    }
}
//# sourceMappingURL=storage.js.map