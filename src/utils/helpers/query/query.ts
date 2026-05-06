/**
 * Query Definitions
 */

/**
 * Parse the search params.
 */
export function parseUrl<T extends Record<string, any> = Record<string, any>>(input?: string): T {
    const search = input ?? window.location.search;
    const params = new URLSearchParams(search.startsWith('?') ? search : `?${search}`);
    const result: Record<string, any> = {};

    params.forEach((value, key) => {
        if (key.endsWith('[]')) {
            const cleanKey = key.slice(0, -2);
            if (!Array.isArray(result[cleanKey])) result[cleanKey] = [];
            result[cleanKey].push(value);
        } else if (result[key] !== undefined) {
            result[key] = Array.isArray(result[key]) ? [...result[key], value] : [result[key], value];
        } else {
            result[key] = value;
        }
    });

    return result as T;
}

/**
 * Get the param.
 */
export function getParam(key: string, fallback: string | null = null): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get(key) ?? fallback;
}

/**
 * Check the key is exist or not?.
 */
export function hasParam(key: string): boolean {
    return new URLSearchParams(window.location.search).has(key);
}

/**
 * Insert the url location into history.
 */
export function setUrl(key: string, value: string, replace = true): void {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    commit(url, replace);
}

/**
 * Remove the url location from history.
 */
export function removeUrl(key: string, replace = true): void {
    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    commit(url, replace);
}

/**
 * Merge the url location into history.
 */
export function mergeUrl(data: Record<string, any>, replace = true): void {
    const url = new URL(window.location.href);

    Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, String(value));
        }
    });

    commit(url, replace);
}

/**
 * Stringify the params.
 */
export function stringify(data: Record<string, any>): string {
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach((v) => params.append(`${key}[]`, String(v)));
        } else if (value !== null && value !== undefined) {
            params.set(key, String(value));
        }
    });

    return params.toString();
}

/**
 * Commit the url location into history.
 */
export function commit(url: URL, replace: boolean): void {
    if (replace) {
        window.history.replaceState({}, '', url.toString());
    } else {
        window.history.pushState({}, '', url.toString());
    }
}
