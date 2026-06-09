"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showLoader = showLoader;
exports.hideLoader = hideLoader;
exports.displayErrors = displayErrors;
exports.validationShow = validationShow;
const app_1 = require("../../../app");
const dom_1 = require("../dom/dom");
function showLoader(id) {
    const el = (0, dom_1.getElementById)(id);
    el.addClass('activeGlobalLoader').css({ display: 'block' });
}
function hideLoader(id) {
    const el = (0, dom_1.getElementById)(id);
    el.removeClass('activeGlobalLoader').css({ display: 'none' });
}
function displayErrors(id, html) {
    const el = (0, dom_1.getElementById)(id);
    el.html(html);
    $('#errorBase').addClass('activateErrors').fadeIn(500);
}
function validationShow(errors) {
    for (const k in errors) {
        if (app_1.Config.app_env) {
            console.log('validation error key:', k);
            console.log('validation error message:', errors[k][0]);
        }
        const parts = k.split('.');
        const id = parts.length === 1 ? `#${k}_error` : `#${parts[0]}\\.${parts[1]}_error`;
        $(id).html(errors[k][0]);
    }
}
//# sourceMappingURL=loader.js.map