import { Guard, Str, Url } from "../../utils";
import { MatchResult, RouteDefinition } from "../../types";
import * as Matcher from "../matcher/matcher";
import * as Builder from "../builder/builder";
import * as Inspector from "../inspector/inspector";
export declare class Route {
    private static currentRoute;
    static normalize: typeof Str.normalize;
    static join: typeof Str.join;
    static split: typeof Str.split;
    static current: typeof Url.current;
    static isDynamicSegment: typeof Guard.isDynamicSegment;
    static isOptionalSegment: typeof Guard.isOptionalSegment;
    static isWildcardSegment: typeof Guard.isWildcardSegment;
    static getParamName: typeof Str.getParamName;
    static match: typeof Matcher.match;
    static params: typeof Matcher.params;
    static matchDetailed: typeof Matcher.matchDetailed;
    static find: typeof Matcher.find;
    static custom: typeof Builder.custom;
    static group: typeof Builder.group;
    static resource: typeof Builder.resource;
    static only: typeof Builder.only;
    static except: typeof Builder.except;
    static shiftParams: typeof Builder.shiftParams;
    static unshiftParams: typeof Builder.unshiftParams;
    static inspect: typeof Inspector.inspect;
    static debug: typeof Inspector.debug;
    static is(pattern: string, path?: string): boolean;
    static page(path: string, routes: RouteDefinition[]): Promise<void>;
    static getMatchedRoute(): MatchResult | null;
}
//# sourceMappingURL=manager.d.ts.map