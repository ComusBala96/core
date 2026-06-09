"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
const helpers_1 = require("../../helpers");
class Error {
    static noServer() {
        return (0, helpers_1.noServer)();
    }
    static validateErrors(errors) {
        return (0, helpers_1.validateErrors)(errors);
    }
    static bigErrors(res) {
        return (0, helpers_1.bigErrors)(res);
    }
}
exports.Error = Error;
//# sourceMappingURL=errors.js.map