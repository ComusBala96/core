import { Guard, Str } from "../../utils";
const DEFAULT_RESOURCE_ACTIONS = ['index', 'create', 'edit', 'save', 'delete'];
export function custom(patterns, importer, meta) {
    return {
        patterns: Array.isArray(patterns) ? patterns.map((p) => Str.normalize(p)) : [Str.normalize(patterns)],
        importer,
        meta,
    };
}
export function group(prefix, routes, options) {
    const normalizedPrefix = Str.normalize(prefix);
    return routes.map((route) => ({
        ...route,
        patterns: route.patterns.map((pattern) => Str.join(normalizedPrefix, pattern)),
        meta: {
            ...(options?.meta ?? {}),
            ...(route.meta ?? {}),
        },
    }));
}
export function resource(base, importer, options = {}) {
    const normalizedBase = Str.normalize(base);
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
                patterns.push(Str.join(normalizedBase, 'create'));
                break;
            case 'edit':
                patterns.push(trailingParam ? Str.join(normalizedBase, 'edit', paramToken) : Str.join(normalizedBase, paramToken, 'edit'));
                break;
            case 'save':
            case 'store':
                patterns.push(trailingParam ? Str.join(normalizedBase, 'save', paramToken) : Str.join(normalizedBase, paramToken, 'save'));
                break;
            case 'update':
                patterns.push(trailingParam ? Str.join(normalizedBase, 'update', paramToken) : Str.join(normalizedBase, paramToken, 'update'));
                break;
            case 'delete':
            case 'destroy':
                patterns.push(trailingParam ? Str.join(normalizedBase, 'delete', paramToken) : Str.join(normalizedBase, paramToken, 'delete'));
                break;
            case 'show':
                patterns.push(shifted ? Str.join(normalizedBase, paramToken) : Str.join(normalizedBase, 'show', paramToken));
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
export function only(actions, importer, base, options) {
    return resource(base, importer, {
        ...options,
        only: actions,
    });
}
export function except(actions, importer, base, options) {
    return resource(base, importer, {
        ...options,
        except: actions,
    });
}
export function shiftParams(pattern) {
    const parts = Str.split(pattern);
    if (parts.length < 3)
        return Str.normalize(pattern);
    const last = parts[parts.length - 1];
    const beforeLast = parts[parts.length - 2];
    if (Guard.isDynamicSegment(last) && !Guard.isDynamicSegment(beforeLast)) {
        const head = parts.slice(0, -2);
        return Str.join(...head, last, beforeLast);
    }
    return Str.normalize(pattern);
}
export function unshiftParams(pattern) {
    const parts = Str.split(pattern);
    if (parts.length < 3)
        return Str.normalize(pattern);
    const last = parts[parts.length - 1];
    const beforeLast = parts[parts.length - 2];
    if (!Guard.isDynamicSegment(last) && Guard.isDynamicSegment(beforeLast)) {
        const head = parts.slice(0, -2);
        return Str.join(...head, last, beforeLast);
    }
    return Str.normalize(pattern);
}
//# sourceMappingURL=builder.js.map