export declare class Guard {
    static isNull(value: unknown): value is null | undefined;
    static isString(value: unknown): value is string;
    static isNumber(value: unknown): value is number;
    static isBoolean(value: unknown): value is boolean;
    static isArray<T = any>(value: unknown): value is T[];
    static isObject<T extends object = Record<string, any>>(obj: T): obj is T;
    static isFunction<T extends (...args: any[]) => any = (...args: any[]) => any>(value: unknown): value is T;
    static isElement(value: unknown): value is HTMLElement;
    static isEmpty(value: unknown): boolean;
    static isPromise<T = any>(value: unknown): value is Promise<T>;
    static isValidUrl(value: string): boolean;
    static isDynamicSegment(segment: string): boolean;
    static isOptionalSegment(segment: string): boolean;
    static isWildcardSegment(segment: string): boolean;
    static isPlugin(plugin: Record<string, any> | undefined): boolean;
    static hasElement(id: string): boolean;
    static hasInternet(): boolean;
    static domElement(element: string): boolean;
}
//# sourceMappingURL=guard.d.ts.map