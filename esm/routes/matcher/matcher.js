import { Guard, Str, Url } from "../../utils";
export function match(pattern, path) {
    return matchDetailed(pattern, path).matched;
}
export function params(pattern, path) {
    return matchDetailed(pattern, path ?? Url.current()).params;
}
export function matchDetailed(pattern, path) {
    const patternParts = Str.split(pattern);
    const pathParts = Str.split(path);
    const extracted = {};
    let i = 0;
    let j = 0;
    while (i < patternParts.length && j < pathParts.length) {
        const patternPart = patternParts[i];
        const pathPart = pathParts[j];
        if (Guard.isWildcardSegment(patternPart)) {
            extracted['wildcard'] = pathParts.slice(j).join('/');
            return {
                matched: true,
                pattern: Str.normalize(pattern),
                params: extracted,
            };
        }
        if (Guard.isDynamicSegment(patternPart)) {
            const name = Str.getParamName(patternPart);
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
        if (Guard.isOptionalSegment(part)) {
            i++;
            continue;
        }
        if (Guard.isWildcardSegment(part)) {
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
        pattern: Str.normalize(pattern),
        params: extracted,
    };
}
export function find(path, routes) {
    const normalizedPath = Url.current(path);
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