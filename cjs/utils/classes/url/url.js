"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Url = void 0;
const helpers_1 = require("../../helpers");
class Url {
    static current(path) {
        return (0, helpers_1.current)(path);
    }
    static reloadTimeout(timeout) {
        return (0, helpers_1.reloadTimeout)(timeout ?? 1200);
    }
    static reload() {
        return (0, helpers_1.reload)();
    }
    static redirectTimeout(url, timeout) {
        return (0, helpers_1.redirectTimeout)(url, timeout ?? 1200);
    }
    static redirect(url) {
        return (0, helpers_1.redirect)(url);
    }
    static reloadTable(api) {
        return (0, helpers_1.reloadTable)(api);
    }
}
exports.Url = Url;
//# sourceMappingURL=url.js.map