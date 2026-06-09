import { Url } from "../../utils";
import { find } from "../matcher/matcher";
export function inspect(routes) {
    return routes;
}
export function debug(path, routes) {
    const found = find(path, routes);
    console.log('[Route.debug]', {
        path: Url.current(path),
        found,
        routes,
    });
}
//# sourceMappingURL=inspector.js.map