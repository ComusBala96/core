/**
 * LocalStorage Definitions.
 */
/**
 * Get the localStorage value.
 */
export function get(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    }
    catch {
        return fallback;
    }
}
/**
 * Set the localStorage value.
 */
export function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
/**
 * Remove the localStorage value.
 */
export function remove(key) {
    localStorage.removeItem(key);
}
//# sourceMappingURL=storage.js.map