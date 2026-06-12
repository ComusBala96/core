"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.current = current;
exports.reloadTimeout = reloadTimeout;
exports.redirectTimeout = redirectTimeout;
exports.reload = reload;
exports.redirect = redirect;
exports.reloadTable = reloadTable;
const app_1 = require("../../../app");
const strings_1 = require("../strings/strings");
const classes_1 = require("../../classes");
/**
 * Get current url.
 */
function current(path) {
    if (path)
        return (0, strings_1.normalize)(path);
    return (0, strings_1.normalize)(window.location.pathname);
}
/**
 * Timeout Reload.
 */
function reloadTimeout(time = 1200) {
    if (time) {
        setTimeout(() => reload(), time);
        return;
    }
    console.error('Time not found!');
}
/**
 * Timeout Redirect.
 */
function redirectTimeout(path, time = 1200) {
    if (time) {
        setTimeout(() => redirect(path), time);
        return;
    }
    console.error('Time not found!');
}
/**
 * Reload.
 */
function reload() {
    if (window) {
        window.location.reload();
        return;
    }
    console.error('Something went wrong! Window not found!');
}
/**
 * Redirect.
 */
function redirect(path) {
    if (path) {
        if (app_1.Config.app_env) {
            console.log((0, strings_1.normalize)(path));
        }
        window.location.href = app_1.Config.app_url + (0, strings_1.normalize)(path);
        return;
    }
    console.error('Redirect URL not found!');
}
function reloadTable(api) {
    if (api) {
        $(classes_1.Str.getSelector('show_selected')).html('');
        $(classes_1.Str.getSelector('show_selected_base')).addClass('hidden');
        api.ajax.reload();
        return;
    }
    console.error('API not found!');
}
//# sourceMappingURL=url.js.map