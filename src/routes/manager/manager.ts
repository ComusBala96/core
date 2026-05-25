import { Guard, Str, Url } from "../../utils";
import { MatchResult, RouteDefinition } from "../../types";
import * as Matcher from "../matcher/matcher";
import * as Builder from "../builder/builder";
import * as Inspector from "../inspector/inspector";


export class Route {
    private static currentRoute: MatchResult | null = null;

    // helpers
    static normalize = Str.normalize;
    static join = Str.join;
    static split = Str.split;
    static current = Url.current;
    static isDynamicSegment = Guard.isDynamicSegment;
    static isOptionalSegment = Guard.isOptionalSegment;
    static isWildcardSegment = Guard.isWildcardSegment;
    static getParamName = Str.getParamName;

    // matcher
    static match = Matcher.match;
    static params = Matcher.params;
    static matchDetailed = Matcher.matchDetailed;
    static find = Matcher.find;

    // builders
    static custom = Builder.custom;
    static group = Builder.group;
    static resource = Builder.resource;
    static only = Builder.only;
    static except = Builder.except;
    static shiftParams = Builder.shiftParams;
    static unshiftParams = Builder.unshiftParams;

    // inspector
    static inspect = Inspector.inspect;
    static debug = Inspector.debug;

    static is(pattern: string, path?: string): boolean {
        return this.match(pattern, path ?? this.current());
    }

    static async page(path: string, routes: RouteDefinition[]): Promise<void> {
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
        } catch (error) {
            console.error(`[RouteManager] Failed to load module for "${this.current(path)}"`, error);
        }
    }

    static getMatchedRoute(): MatchResult | null {
        return this.currentRoute;
    }
}
