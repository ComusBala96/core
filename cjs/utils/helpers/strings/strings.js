"use strict";
/**
 * String Definitions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.slug = slug;
exports.getExportValue = getExportValue;
exports.camel = camel;
exports.pascal = pascal;
exports.snake = snake;
exports.kebab = kebab;
exports.title = title;
exports.ucfirst = ucfirst;
exports.limit = limit;
exports.random = random;
exports.makeExportName = makeExportName;
exports.sanitizeVarName = sanitizeVarName;
exports.splitArray = splitArray;
exports.escapeHtml = escapeHtml;
exports.normalize = normalize;
exports.join = join;
exports.split = split;
exports.getParamName = getParamName;
exports.normalizeName = normalizeName;
exports.getSelector = getSelector;
/**
 * Make a custom slug.
 */
function slug(value, separator = '-') {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, separator)
        .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');
}
function getExportValue(value) {
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
function camel(value) {
    return value.replace(/[-_\s]+(.)?/g, (_, chr) => (chr ? chr.toUpperCase() : '')).replace(/^(.)/, (m) => m.toLowerCase());
}
/**
 * Make a pascal case string.
 */
function pascal(value) {
    const text = camel(value);
    return text.charAt(0).toUpperCase() + text.slice(1);
}
/**
 * Make a snake case string.
 */
function snake(value) {
    return value
        .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
        .replace(/^_/, '')
        .replace(/[\s-]+/g, '_');
}
/**
 * Make a _ case string.
 */
function kebab(value) {
    return slug(value, '-');
}
/**
 * Parse sentence case.
 */
function title(value) {
    return value.replace(/[-_]/g, ' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());
}
/**
 * Parse first letter uppercase.
 */
function ucfirst(value) {
    return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}
/**
 * Limit sentence length.
 */
function limit(value, length = 100, end = '...') {
    return value.length > length ? value.slice(0, length) + end : value;
}
/**
 * generate random string.
 */
function random(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
/**
 * get _ file name.
 */
function makeExportName(file) {
    return sanitizeVarName(file.replace(/[\/\\]+/g, '_').replace(/[-.]/g, '_'));
}
/**
 * Replace name into _ case.
 */
function sanitizeVarName(name) {
    return name.replace(/[^a-zA-Z0-9_$]/g, '_').replace(/^[^a-zA-Z_$]/, '_$&');
}
/**
 * Split array into chunk size.
 */
function splitArray(arr, chunkSize) {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}
/**
 * Remove html tags from string.
 */
function escapeHtml(value) {
    return (value
        ?.toString()
        .replace(/<[^>]*>/g, '')
        .trim() ?? '');
}
/**
 * Normalize url path.
 */
function normalize(path) {
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
function join(...parts) {
    return parts
        .map((part) => normalize(part))
        .filter(Boolean)
        .join('/');
}
/**
 * Split url path.
 */
function split(path) {
    return normalize(path).split('/').filter(Boolean);
}
/**
 * Get param name.
 */
function getParamName(segment) {
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
function normalizeName(name) {
    return name.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
}
function getSelector(selector) {
    return /^[#.]/.test(selector.trim()) ? selector.trim() : `#${selector.trim()}`;
}
//# sourceMappingURL=strings.js.map