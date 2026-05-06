import {
    hasElement,
    hasInternet,
    isArray,
    isBoolean,
    isDynamicSegment,
    isElement,
    isEmpty,
    isFunction,
    isNull,
    isNumber,
    isObject,
    isOptionalSegment,
    isPlugin,
    isPromise,
    isString,
    isValidUrl,
    isWildcardSegment,
} from '../../helpers';

export class Guard {
    static isNull(value: unknown): value is null | undefined {
        return isNull(value);
    }

    static isString(value: unknown): value is string {
        return isString(value);
    }

    static isNumber(value: unknown): value is number {
        return isNumber(value);
    }

    static isBoolean(value: unknown): value is boolean {
        return isBoolean(value);
    }

    static isArray<T = any>(value: unknown): value is T[] {
        return isArray(value);
    }

    static isObject<T extends object = Record<string, any>>(value: unknown): value is T {
        return isObject(value);
    }

    static isFunction<T extends (...args: any[]) => any = (...args: any[]) => any>(value: unknown): value is T {
        return isFunction(value);
    }

    static isElement(value: unknown): value is HTMLElement {
        return isElement(value);
    }

    static isEmpty(value: unknown): boolean {
        return isEmpty(value);
    }

    static isPromise<T = any>(value: unknown): value is Promise<T> {
        return isPromise(value);
    }

    static isValidUrl(value: string): boolean {
        return isValidUrl(value);
    }

    static isDynamicSegment(segment: string): boolean {
        return isDynamicSegment(segment);
    }

    static isOptionalSegment(segment: string): boolean {
        return isOptionalSegment(segment);
    }

    static isWildcardSegment(segment: string): boolean {
        return isWildcardSegment(segment);
    }
    static isPlugin(plugin: string[] | undefined): boolean {
        return isPlugin(plugin);
    }
    static hasElement(id: string): boolean {
        return hasElement(id);
    }
    static hasInternet(): boolean {
        return hasInternet();
    }
}
