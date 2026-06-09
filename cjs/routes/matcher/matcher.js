"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = match;
exports.params = params;
exports.matchDetailed = matchDetailed;
exports.find = find;
const utils_1 = require("../../utils");
function match(pattern, path) {
    return matchDetailed(pattern, path).matched;
}
function params(pattern, path) {
    return matchDetailed(pattern, path ?? utils_1.Url.current()).params;
}
function matchDetailed(pattern, path) {
    const patternParts = utils_1.Str.split(pattern);
    const pathParts = utils_1.Str.split(path);
    const extracted = {};
    let i = 0;
    let j = 0;
    while (i < patternParts.length && j < pathParts.length) {
        const patternPart = patternParts[i];
        const pathPart = pathParts[j];
        if (utils_1.Guard.isWildcardSegment(patternPart)) {
            extracted['wildcard'] = pathParts.slice(j).join('/');
            return {
                matched: true,
                pattern: utils_1.Str.normalize(pattern),
                params: extracted,
            };
        }
        if (utils_1.Guard.isDynamicSegment(patternPart)) {
            const name = utils_1.Str.getParamName(patternPart);
            if (name)
                extracted[name] = pathPart;
            i++;
            j++;
            continue;
        }
        if (patternPart !== pathPart) {
            return {
                matched: false,
                params: {},
            };
        }
        i++;
        j++;
    }
    while (i < patternParts.length) {
        const part = patternParts[i];
        if (utils_1.Guard.isOptionalSegment(part)) {
            i++;
            continue;
        }
        if (utils_1.Guard.isWildcardSegment(part)) {
            extracted['wildcard'] = '';
            i++;
            continue;
        }
        return {
            matched: false,
            params: {},
        };
    }
    if (j < pathParts.length) {
        return {
            matched: false,
            params: {},
        };
    }
    return {
        matched: true,
        pattern: utils_1.Str.normalize(pattern),
        params: extracted,
    };
}
function find(path, routes) {
    const normalizedPath = utils_1.Url.current(path);
    for (const route of routes) {
        for (const pattern of route.patterns) {
            const result = matchDetailed(pattern, normalizedPath);
            if (result.matched) {
                return {
                    ...result,
                    route,
                };
            }
        }
    }
    return {
        matched: false,
        params: {},
    };
}
//# sourceMappingURL=matcher.js.map