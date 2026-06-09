export declare class Query {
    static parseUrl<T extends Record<string, any> = Record<string, any>>(input?: string): T;
    static getParam(key: string, fallback?: string | null): string | null;
    static hasParam(key: string): boolean;
    static setUrl(key: string, value: string, replace?: boolean): void;
    static removeUrl(key: string, replace?: boolean): void;
    static mergeUrl(data: Record<string, any>, replace?: boolean): void;
    static stringify(data: Record<string, any>): string;
    static commit(url: URL, replace: boolean): void;
}
//# sourceMappingURL=query.d.ts.map