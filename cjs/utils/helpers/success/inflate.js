"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inflateSuccess = inflateSuccess;
exports.inflateRequire = inflateRequire;
const loader_1 = require("../loader/loader");
function inflateSuccess(msg) {
    if (msg) {
        const d = `<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">${msg}</div>`;
        $('#inflate').append(d);
    }
    const t = setTimeout(() => {
        $('#inflate').html('');
        clearTimeout(t);
        (0, loader_1.hideLoader)('theGlobalLoader');
    }, 500);
}
function inflateRequire(msg) {
    if (msg) {
        const d = `<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">${msg}</div>`;
        $('#inflate').append(d);
    }
    const t = setTimeout(() => {
        $('#inflate').html('');
        clearTimeout(t);
        (0, loader_1.hideLoader)('theGlobalLoader');
    }, 500);
}
//# sourceMappingURL=inflate.js.map