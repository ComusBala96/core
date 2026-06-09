"use strict";
/**
 * LocalStorage Definitions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = get;
exports.set = set;
exports.remove = remove;
/**
 * Get the localStorage value.
 */
function get(key, fallback = null) {
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
function set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
/**
 * Remove the localStorage value.
 */
function remove(key) {
    localStorage.removeItem(key);
}
//# sourceMappingURL=storage.js.map