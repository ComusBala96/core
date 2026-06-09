import { Guard, Str, Url } from "../../utils";
import * as Matcher from "../matcher/matcher";
import * as Builder from "../builder/builder";
import * as Inspector from "../inspector/inspector";
export class Route {
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
Route.currentRoute = null;
// helpers
Route.normalize = Str.normalize;
Route.join = Str.join;
Route.split = Str.split;
Route.current = Url.current;
Route.isDynamicSegment = Guard.isDynamicSegment;
Route.isOptionalSegment = Guard.isOptionalSegment;
Route.isWildcardSegment = Guard.isWildcardSegment;
Route.getParamName = Str.getParamName;
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