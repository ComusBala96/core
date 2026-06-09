"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Str = void 0;
const helpers_1 = require("../../helpers");
class Str {
    static slug(value, separator = '-') {
        return (0, helpers_1.slug)(value, separator);
    }
    static camel(value) {
        return (0, helpers_1.camel)(value);
    }
    static pascal(value) {
        return (0, helpers_1.pascal)(value);
    }
    static snake(value) {
        return (0, helpers_1.snake)(value);
    }
    static kebab(value) {
        return (0, helpers_1.kebab)(value);
    }
    static title(value) {
        return (0, helpers_1.title)(value);
    }
    static ucfirst(value) {
        return (0, helpers_1.ucfirst)(value);
    }
    static limit(value, length = 100, end = '...') {
        return (0, helpers_1.limit)(value, length, end);
    }
    static random(length = 8) {
        return (0, helpers_1.random)(length);
    }
    static makeExportName(file) {
        return (0, helpers_1.makeExportName)(file);
    }
    static sanitizeVarName(name) {
        return (0, helpers_1.sanitizeVarName)(name);
    }
    static splitArray(arr, chunkSize) {
        return (0, helpers_1.splitArray)(arr, chunkSize);
    }
    static escapeHtml(value) {
        return (0, helpers_1.escapeHtml)(value);
    }
    static getExportValue(value) {
        return (0, helpers_1.getExportValue)(value);
    }
    static getNestedValue(path, object) {
        return (0, helpers_1.getNestedValue)(path, object);
    }
    static normalize(path) {
        return (0, helpers_1.normalize)(path);
    }
    static join(...parts) {
        return (0, helpers_1.join)(...parts);
    }
    static split(path) {
        return (0, helpers_1.split)(path);
    }
    static getParamName(segment) {
        return (0, helpers_1.getParamName)(segment);
    }
    static normalizeName(name) {
        return (0, helpers_1.normalizeName)(name);
    }
    static getSelector(selector) {
        return (0, helpers_1.getSelector)(selector);
    }
}
exports.Str = Str;
//# sourceMappingURL=string.js.map