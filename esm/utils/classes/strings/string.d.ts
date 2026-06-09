export declare class Str {
    static slug(value: string, separator?: string): string;
    static camel(value: string): string;
    static pascal(value: string): string;
    static snake(value: string): string;
    static kebab(value: string): string;
    static title(value: string): string;
    static ucfirst(value: string): string;
    static limit(value: string, length?: number, end?: string): string;
    static random(length?: number): string;
    static makeExportName(file: string): string;
    static sanitizeVarName(name: string): string;
    static splitArray<T>(arr: T[], chunkSize: number): T[][];
    static escapeHtml(value: unknown): string;
    static getExportValue(value: string | number): string | number;
    static getNestedValue(path: string, object: Record<string, any>): any;
    static normalize(path: string): string;
    static join(...parts: string[]): string;
    static split(path: string): string[];
    static getParamName(segment: string): string | null;
    static normalizeName(name: string): string;
    static getSelector(selector: string): string;
}
//# sourceMappingURL=string.d.ts.map