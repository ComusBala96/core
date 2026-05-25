import { get, remove, set } from "../../helpers";

export class LocalStorage {
    static get<T = any>(key: string, fallback: T | null = null): T | null {
        return get(key, fallback);
    }

    static set(key: string, value: any) {
        set(key, value);
    }

    static remove(key: string) {
        remove(key);
    }
}
