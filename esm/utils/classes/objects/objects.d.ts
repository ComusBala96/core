export declare class Obj {
    static merge<T extends Record<string, any>, U extends Record<string, any>>(a: T, b: U): T & U;
    static deepGet(obj: Record<string, any>, path: string, fallback?: any): Record<string, any>;
    static getNestedValue(path: string, object: Record<string, any>): any;
    static mergePayload(data: Record<string, any>, payload?: Record<string, any>): Record<string, any>;
    static getDataAttr(element: string): Record<string, unknown>;
    static jsonParse(data: string): Record<string, any>;
    static getValidationMessages(rules: Record<string, any>): Record<string, any>;
}
//# sourceMappingURL=objects.d.ts.map