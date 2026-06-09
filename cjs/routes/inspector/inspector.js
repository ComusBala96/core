"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspect = inspect;
exports.debug = debug;
const utils_1 = require("../../utils");
const matcher_1 = require("../matcher/matcher");
function inspect(routes) {
    return routes;
}
function debug(path, routes) {
    const found = (0, matcher_1.find)(path, routes);
    console.log('[Route.debug]', {
        path: utils_1.Url.current(path),
        found,
        routes,
    });
}
//# sourceMappingURL=inspector.js.map