import { camel, escapeHtml, getExportValue, getNestedValue, getParamName, getSelector, join, kebab, limit, makeExportName, normalize, normalizeName, pascal, random, sanitizeVarName, slug, snake, split, splitArray, title, ucfirst, } from '../../helpers';
export class Str {
    static slug(value, separator = '-') {
        return slug(value, separator);
    }
    static camel(value) {
        return camel(value);
    }
    static pascal(value) {
        return pascal(value);
    }
    static snake(value) {
        return snake(value);
    }
    static kebab(value) {
        return kebab(value);
    }
    static title(value) {
        return title(value);
    }
    static ucfirst(value) {
        return ucfirst(value);
    }
    static limit(value, length = 100, end = '...') {
        return limit(value, length, end);
    }
    static random(length = 8) {
        return random(length);
    }
    static makeExportName(file) {
        return makeExportName(file);
    }
    static sanitizeVarName(name) {
        return sanitizeVarName(name);
    }
    static splitArray(arr, chunkSize) {
        return splitArray(arr, chunkSize);
    }
    static escapeHtml(value) {
        return escapeHtml(value);
    }
    static getExportValue(value) {
        return getExportValue(value);
    }
    static getNestedValue(path, object) {
        return getNestedValue(path, object);
    }
    static normalize(path) {
        return normalize(path);
    }
    static join(...parts) {
        return join(...parts);
    }
    static split(path) {
        return split(path);
    }
    static getParamName(segment) {
        return getParamName(segment);
    }
    static normalizeName(name) {
        return normalizeName(name);
    }
    static getSelector(selector) {
        return getSelector(selector);
    }
}
//# sourceMappingURL=string.js.map