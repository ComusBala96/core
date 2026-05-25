/**
 * String Definitions.
 */

/**
 * Make a custom slug.
 */
export function slug(value: string, separator = '-'): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, separator)
        .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');
}

/**
 * Make a camel case string.
 */
export function camel(value: string): string {
    return value.replace(/[-_\s]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : '')).replace(/^(.)/, (m) => m.toLowerCase());
}

/**
 * Make a pascal case string.
 */
export function pascal(value: string): string {
    const text = camel(value);
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Make a snake case string.
 */
export function snake(value: string): string {
    return value
        .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
        .replace(/^_/, '')
        .replace(/[\s-]+/g, '_');
}

/**
 * Make a _ case string.
 */
export function kebab(value: string): string {
    return slug(value, '-');
}

/**
 * Parse sentence case.
 */
export function title(value: string): string {
    return value.replace(/[-_]/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}

/**
 * Parse first letter uppercase.
 */
export function ucfirst(value: string): string {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

/**
 * Limit sentence length.
 */
export function limit(value: string, length = 100, end = '...'): string {
    return value.length > length ? value.slice(0, length) + end : value;
}

/**
 * generate random string.
 */
export function random(length = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

/**
 * get _ file name.
 */
export function makeExportName(file: string): string {
    return sanitizeVarName(file.replace(/[\/\\]+/g, '_').replace(/[-.]/g, '_'));
}

/**
 * Replace name into _ case.
 */
export function sanitizeVarName(name: string): string {
    return name.replace(/[^a-zA-Z0-9_$]/g, '_').replace(/^[^a-zA-Z_$]/, '_$&');
}

/**
 * Split array into chunk size.
 */

export function splitArray<T>(arr: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}

/**
 * Remove html tags from string.
 */
export function escapeHtml(value: unknown): string {
    return (
        value
            ?.toString()
            .replace(/<[^>]*>/g, '')
            .trim() ?? ''
    );
}

/**
 * Normalize url path.
 */
export function normalize(path: string): string {
    if (!path) return '';
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
export function join(...parts: string[]): string {
    return parts
        .map((part) => normalize(part))
        .filter(Boolean)
        .join('/');
}

/**
 * Split url path.
 */
export function split(path: string): string[] {
    return normalize(path).split('/').filter(Boolean);
}

/**
 * Get param name.
 */
export function getParamName(segment: string): string | null {
    const laravel = segment.match(/^\{(.+?)\??\}$/);
    const express = segment.match(/^:(.+?)\??$/);

    if (laravel) return laravel[1];
    if (express) return express[1];

    return null;
}

/**
 * Normalize name by removing common prefixes/suffixes.
 */
export function normalizeName(name: string): string {
    return name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
}
