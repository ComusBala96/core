import { commit, getParam, hasParam, mergeUrl, parseUrl, removeUrl, setUrl, stringify } from "../../helpers";


export class Query {
    static parseUrl<T extends Record<string, any> = Record<string, any>>(input?: string): T {
        return parseUrl(input);
    }

    static getParam(key: string, fallback: string | null = null): string | null {
        return getParam(key, fallback);
    }

    static hasParam(key: string): boolean {
        return hasParam(key);
    }

    static setUrl(key: string, value: string, replace = true): void {
        setUrl(key, value, replace);
    }

    static removeUrl(key: string, replace = true): void {
        removeUrl(key, replace);
    }

    static mergeUrl(data: Record<string, any>, replace = true): void {
        mergeUrl(data, replace);
    }

    static stringify(data: Record<string, any>): string {
        return stringify(data);
    }

    static commit(url: URL, replace: boolean): void {
        commit(url, replace);
    }
}
