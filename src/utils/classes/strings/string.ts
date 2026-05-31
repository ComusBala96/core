import {
    camel,
    escapeHtml,
    getNestedValue,
    getParamName,
    getSelector,
    join,
    kebab,
    limit,
    makeExportName,
    normalize,
    normalizeName,
    pascal,
    random,
    sanitizeVarName,
    slug,
    snake,
    split,
    splitArray,
    title,
    ucfirst,
} from '../../helpers';

export class Str {
    static slug(value: string, separator = '-'): string {
        return slug(value, separator);
    }

    static camel(value: string): string {
        return camel(value);
    }

    static pascal(value: string): string {
        return pascal(value);
    }

    static snake(value: string): string {
        return snake(value);
    }

    static kebab(value: string): string {
        return kebab(value);
    }

    static title(value: string): string {
        return title(value);
    }

    static ucfirst(value: string): string {
        return ucfirst(value);
    }

    static limit(value: string, length = 100, end = '...'): string {
        return limit(value, length, end);
    }

    static random(length = 8): string {
        return random(length);
    }

    static makeExportName(file: string): string {
        return makeExportName(file);
    }

    static sanitizeVarName(name: string): string {
        return sanitizeVarName(name);
    }

    static splitArray<T>(arr: T[], chunkSize: number): T[][] {
        return splitArray(arr, chunkSize);
    }

    static escapeHtml(value: unknown): string {
        return escapeHtml(value);
    }

    static getNestedValue(path: string, object: Record<string, any>): any {
        return getNestedValue(path, object);
    }

    static normalize(path: string): string {
        return normalize(path);
    }

    static join(...parts: string[]): string {
        return join(...parts);
    }

    static split(path: string): string[] {
        return split(path);
    }

    static getParamName(segment: string): string | null {
        return getParamName(segment);
    }
    static normalizeName(name: string): string {
        return normalizeName(name);
    }
    static getSelector(selector: string): string {
        return getSelector(selector);
    }
}
