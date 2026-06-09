/**
 *  Guards Definitions
 */
/**
 * It is used for checking the null.
 * @param value unknown.
 * @return boolean | undefined.
 */
export declare function isNull(value: unknown): value is null | undefined;
/**
 * It is used for checking the string.
 * @param value unknown.
 * @return boolean.
 */
export declare function isString(value: unknown): value is string;
/**
 * It is used for checking the number.
 * @param value unknown.
 * @return boolean.
 */
export declare function isNumber(value: unknown): value is number;
/**
 * It is used for checking the boolean.
 * @param value unknown.
 * @return boolean.
 */
export declare function isBoolean(value: unknown): value is boolean;
/**
 * It is used for checking the array.
 * @param value unknown.
 * @return boolean.
 */
export declare function isArray<T = any>(value: unknown): value is T[];
/**
 * It is used for checking the object.
 * @param value unknown.
 * @return boolean.
 */
export declare function isObject<T extends object = Record<string, any>>(obj: T): obj is T;
/**
 * It is used for checking the function.
 * @param args any[].
 * @param value unknown.
 * @return boolean.
 */
export declare function isFunction<T extends (...args: any[]) => any = (...args: any[]) => any>(value: unknown): value is T;
/**
 * It is used for checking the element.
 * @param value unknown.
 * @return boolean.
 */
export declare function isElement(value: unknown): value is HTMLElement;
/**
 * It is used for checking the empty.
 * @param value unknown.
 * @return boolean.
 */
export declare function isEmpty(value: unknown): boolean;
/**
 * It is used for checking the promise.
 * @param value unknown.
 * @return boolean.
 */
export declare function isPromise<T = any>(value: unknown): value is Promise<T>;
/**
 * It is used for checking the valid url.
 * @param value unknown.
 * @return boolean.
 */
export declare function isValidUrl(value: string): boolean;
/**
 * It is used for checking the dynamic segment.
 * @param segment string.
 * @return boolean.
 */
export declare function isDynamicSegment(segment: string): boolean;
/**
 * It is used for checking the optional segment.
 * @param segment string.
 * @return boolean.
 */
export declare function isOptionalSegment(segment: string): boolean;
/**
 * It is used for checking the wildcard segment.
 * @param segment string.
 * @return boolean.
 */
export declare function isWildcardSegment(segment: string): boolean;
export declare function isPlugin(plugin: Record<string, any> | undefined): boolean;
/**
 * Connection Error.
 */
export declare function hasInternet(): boolean;
/**
 * It is used for checking the element.
 * @param value string.
 * @return boolean.
 */
export declare function hasElement(id: string): boolean;
export declare function domElement(element: string): boolean;
//# sourceMappingURL=guards.d.ts.map