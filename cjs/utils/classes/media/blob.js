"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blob = void 0;
const helpers_1 = require("../../helpers");
class Blob {
    static createImageUrl(file) {
        return (0, helpers_1.createImageUrl)(file);
    }
    static getMimes(mimetypes) {
        return (0, helpers_1.getMimes)(mimetypes);
    }
}
exports.Blob = Blob;
_a = Blob;
Blob.urlToBase64 = async (url) => {
    return await (0, helpers_1.urlToBase64)(url);
};
//# sourceMappingURL=blob.js.map