import { MatchResult, RouteDefinition } from "../../types";
export declare function match(pattern: string, path: string): boolean;
export declare function params(pattern: string, path?: string): Record<string, string>;
export declare function matchDetailed(pattern: string, path: string): MatchResult;
export declare function find(path: string, routes: RouteDefinition[]): MatchResult;
//# sourceMappingURL=matcher.d.ts.map