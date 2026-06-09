"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const tslib_1 = require("tslib");
const utils_1 = require("../../utils");
const Matcher = tslib_1.__importStar(require("../matcher/matcher"));
const Builder = tslib_1.__importStar(require("../builder/builder"));
const Inspector = tslib_1.__importStar(require("../inspector/inspector"));
class Route {
    static is(pattern, path) {
        return this.match(pattern, path ?? this.current());
    }
    static async page(path, routes) {
        const found = this.find(path, routes);
        this.currentRoute = found;
        if (!found.matched || !found.route) {
            console.warn(`[RouteManager] No route matched for "${this.current(path)}"`);
            return;
        }
        try {
            const mod = await found.route.importer();
            if (typeof mod.default === 'function') {
                await mod.default();
                return;
            }
            if (typeof mod.init === 'function') {
                await mod.init();
                return;
            }
            console.warn(`[RouteManager] Matched route has no default/init export.`);
        }
        catch (error) {
            console.error(`[RouteManager] Failed to load module for "${this.current(path)}"`, error);
        }
    }
    static getMatchedRoute() {
        return this.currentRoute;
    }
}
exports.Route = Route;
Route.currentRoute = null;
// helpers
Route.normalize = utils_1.Str.normalize;
Route.join = utils_1.Str.join;
Route.split = utils_1.Str.split;
Route.current = utils_1.Url.current;
Route.isDynamicSegment = utils_1.Guard.isDynamicSegment;
Route.isOptionalSegment = utils_1.Guard.isOptionalSegment;
Route.isWildcardSegment = utils_1.Guard.isWildcardSegment;
Route.getParamName = utils_1.Str.getParamName;
// matcher
Route.match = Matcher.match;
Route.params = Matcher.params;
Route.matchDetailed = Matcher.matchDetailed;
Route.find = Matcher.find;
// builders
Route.custom = Builder.custom;
Route.group = Builder.group;
Route.resource = Builder.resource;
Route.only = Builder.only;
Route.except = Builder.except;
Route.shiftParams = Builder.shiftParams;
Route.unshiftParams = Builder.unshiftParams;
// inspector
Route.inspect = Inspector.inspect;
Route.debug = Inspector.debug;
//# sourceMappingURL=manager.js.map