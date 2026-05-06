import { Url } from "../../utils";
import { find } from "../matcher/matcher";
import { RouteDefinition } from "../../types";


export function inspect(routes: RouteDefinition[]): RouteDefinition[] {
    return routes;
}

export function debug(path: string, routes: RouteDefinition[]): void {
    const found = find(path, routes);

    console.log('[Route.debug]', {
        path: Url.current(path),
        found,
        routes,
    });
}
