/**
 * String Definitions.
 */
/**
 * Make a custom slug.
 */
export function slug(value, separator = '-') {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, separator)
        .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');
}
export function getExportValue(value) {
    if (typeof value !== 'string') {
        return value;
    }
    if (value.includes('<img')) {
        const doc = new DOMParser().parseFromString(value, 'text/html');
        const img = doc.querySelector('img');
        if (img?.src) {
            return img.src;
        }
    }
    return value;
}
/**
 * Make a camel case string.
 */
export function camel(value) {
    return value.replace(/[-_\s]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : '')).replace(/^(.)/, (m) => m.toLowerCase());
}
/**
 * Make a pascal case string.
 */
export function pascal(value) {
    const text = camel(value);
    return text.charAt(0).toUpperCase() + text.slice(1);
}
/**
 * Make a snake case string.
 */
export function snake(value) {
    return value
        .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
        .replace(/^_/, '')
        .replace(/[\s-]+/g, '_');
}
/**
 * Make a _ case string.
 */
export function kebab(value) {
    return slug(value, '-');
}
/**
 * Parse sentence case.
 */
export function title(value) {
    return value.replace(/[-_]/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}
/**
 * Parse first letter uppercase.
 */
export function ucfirst(value) {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}
/**
 * Limit sentence length.
 */
export function limit(value, length = 100, end = '...') {
    return value.length > length ? value.slice(0, length) + end : value;
}
/**
 * generate random string.
 */
export function random(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
/**
 * get _ file name.
 */
export function makeExportName(file) {
    return sanitizeVarName(file.replace(/[\/\\]+/g, '_').replace(/[-.]/g, '_'));
}
/**
 * Replace name into _ case.
 */
export function sanitizeVarName(name) {
    return name.replace(/[^a-zA-Z0-9_$]/g, '_').replace(/^[^a-zA-Z_$]/, '_$&');
}
/**
 * Split array into chunk size.
 */
export function splitArray(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}
/**
 * Remove html tags from string.
 */
export function escapeHtml(value) {
    return (value
        ?.toString()
        .replace(/<[^>]*>/g, '')
        .trim() ?? '');
}
/**
 * Normalize url path.
 */
export function normalize(path) {
    if (!path)
        return '';
    return path
        .split('?')[0]
        .split('#')[0]
        .replace(/\\/g, '/')
        .replace(/\/{2,}/g, '/')
        .replace(/^\/+|\/+$/g, '');
}
/**
 * Join url path.
 */
export function join(...parts) {
    return parts
        .map((part) => normalize(part))
        .filter(Boolean)
        .join('/');
}
/**
 * Split url path.
 */
export function split(path) {
    return normalize(path).split('/').filter(Boolean);
}
/**
 * Get param name.
 */
export function getParamName(segment) {
    const laravel = segment.match(/^\{(.+?)\??\}$/);
    const express = segment.match(/^:(.+?)\??$/);
    if (laravel)
        return laravel[1];
    if (express)
        return express[1];
    return null;
}
/**
 * Normalize name by removing common prefixes/suffixes.
 */
export function normalizeName(name) {
    return name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
}
export function getSelector(selector) {
    return /^[#.]/.test(selector.trim()) ? selector.trim() : `#${selector.trim()}`;
}
//# sourceMappingURL=strings.js.map