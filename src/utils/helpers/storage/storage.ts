/**
 * LocalStorage Definitions.
 */

/**
 * Get the localStorage value.
 */
export function get<T = any>(key: string, fallback: T | null = null): T | null {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
}

/**
 * Set the localStorage value.
 */
export function set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Remove the localStorage value.
 */
export function remove(key: string) {
    localStorage.removeItem(key);
}
