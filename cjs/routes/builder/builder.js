"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.custom = custom;
exports.group = group;
exports.resource = resource;
exports.only = only;
exports.except = except;
exports.shiftParams = shiftParams;
exports.unshiftParams = unshiftParams;
const utils_1 = require("../../utils");
const DEFAULT_RESOURCE_ACTIONS = ['index', 'create', 'edit', 'save', 'delete'];
function custom(patterns, importer, meta) {
    return {
        patterns: Array.isArray(patterns) ? patterns.map((p) => utils_1.Str.normalize(p)) : [utils_1.Str.normalize(patterns)],
        importer,
        meta,
    };
}
function group(prefix, routes, options) {
    const normalizedPrefix = utils_1.Str.normalize(prefix);
    return routes.map((route) => ({
        ...route,
        patterns: route.patterns.map((pattern) => utils_1.Str.join(normalizedPrefix, pattern)),
        meta: {
            ...(options?.meta ?? {}),
            ...(route.meta ?? {}),
        },
    }));
}
function resource(base, importer, options = {}) {
    const normalizedBase = utils_1.Str.normalize(base);
    const param = options.param ?? 'uuid';
    const paramToken = `{${param}}`;
    const allActions = options.actions ?? DEFAULT_RESOURCE_ACTIONS;
    let actions = [...allActions];
    if (options.only?.length) {
        actions = actions.filter((action) => options.only.includes(action));
    }
    if (options.except?.length) {
        actions = actions.filter((action) => !options.except.includes(action));
    }
    const shifted = options.shifted ?? false;
    const trailingParam = options.trailingParam ?? !shifted;
    const patterns = [];
    for (const action of actions) {
        switch (action) {
            case 'index':
                patterns.push(normalizedBase);
                break;
            case 'create':
                patterns.push(utils_1.Str.join(normalizedBase, 'create'));
                break;
            case 'edit':
                patterns.push(trailingParam ? utils_1.Str.join(normalizedBase, 'edit', paramToken) : utils_1.Str.join(normalizedBase, paramToken, 'edit'));
                break;
            case 'save':
            case 'store':
                patterns.push(trailingParam ? utils_1.Str.join(normalizedBase, 'save', paramToken) : utils_1.Str.join(normalizedBase, paramToken, 'save'));
                break;
            case 'update':
                patterns.push(trailingParam ? utils_1.Str.join(normalizedBase, 'update', paramToken) : utils_1.Str.join(normalizedBase, paramToken, 'update'));
                break;
            case 'delete':
            case 'destroy':
                patterns.push(trailingParam ? utils_1.Str.join(normalizedBase, 'delete', paramToken) : utils_1.Str.join(normalizedBase, paramToken, 'delete'));
                break;
            case 'show':
                patterns.push(shifted ? utils_1.Str.join(normalizedBase, paramToken) : utils_1.Str.join(normalizedBase, 'show', paramToken));
                break;
            case 'custom':
                break;
        }
    }
    return {
        patterns: [...new Set(patterns)],
        importer,
        meta: options.meta,
    };
}
function only(actions, importer, base, options) {
    return resource(base, importer, {
        ...options,
        only: actions,
    });
}
function except(actions, importer, base, options) {
    return resource(base, importer, {
        ...options,
        except: actions,
    });
}
function shiftParams(pattern) {
    const parts = utils_1.Str.split(pattern);
    if (parts.length < 3)
        return utils_1.Str.normalize(pattern);
    const last = parts[parts.length - 1];
    const beforeLast = parts[parts.length - 2];
    if (utils_1.Guard.isDynamicSegment(last) && !utils_1.Guard.isDynamicSegment(beforeLast)) {
        const head = parts.slice(0, -2);
        return utils_1.Str.join(...head, last, beforeLast);
    }
    return utils_1.Str.normalize(pattern);
}
function unshiftParams(pattern) {
    const parts = utils_1.Str.split(pattern);
    if (parts.length < 3)
        return utils_1.Str.normalize(pattern);
    const last = parts[parts.length - 1];
    const beforeLast = parts[parts.length - 2];
    if (!utils_1.Guard.isDynamicSegment(last) && utils_1.Guard.isDynamicSegment(beforeLast)) {
        const head = parts.slice(0, -2);
        return utils_1.Str.join(...head, last, beforeLast);
    }
    return utils_1.Str.normalize(pattern);
}
//# sourceMappingURL=builder.js.map