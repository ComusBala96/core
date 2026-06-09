import { GroupOptions, PageImporter, ResourceOptions, RouteAction, RouteDefinition, RouteMeta } from "../../types";
export declare function custom(patterns: string | string[], importer: PageImporter, meta?: RouteMeta): RouteDefinition;
export declare function group(prefix: string, routes: RouteDefinition[], options?: GroupOptions): RouteDefinition[];
export declare function resource(base: string, importer: PageImporter, options?: ResourceOptions): RouteDefinition;
export declare function only(actions: RouteAction[], importer: PageImporter, base: string, options?: ResourceOptions): RouteDefinition;
export declare function except(actions: RouteAction[], importer: PageImporter, base: string, options?: ResourceOptions): RouteDefinition;
export declare function shiftParams(pattern: string): string;
export declare function unshiftParams(pattern: string): string;
//# sourceMappingURL=builder.d.ts.map