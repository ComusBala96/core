"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successor = successor;
const app_1 = require("../../../app");
const dom_1 = require("../dom");
const errors_1 = require("../errors");
const loader_1 = require("../loader");
const url_1 = require("../url");
const inflate_1 = require("./inflate");
function successor(op) {
    const { response = null, element = 'no', customHideLoader = true, status = true, afterSuccess = {} } = op;
    $(`#${element} label span`).html('').removeClass('text-red-600');
    if (app_1.Config.app_env) {
        console.log(response);
    }
    if (!response || typeof response !== 'object') {
        $('#theGlobalLoader').removeClass('activeGlobalLoader').hide();
        return;
    }
    if (!response.success) {
        (0, errors_1.displayAllErrors)(op);
        return;
    }
    const extraData = response.data?.extraData ?? {
        inflate: app_1.Lang.getLangBags()?.no_message_return,
        redirect: window.location.href,
    };
    const view = response.data?.view ?? '';
    const { afterLoad, target = 'editView', type } = afterSuccess;
    const obj = { ...op, response };
    switch (type) {
        case 'inflate_response_data':
            (0, inflate_1.inflateSuccess)(extraData.inflate);
            break;
        case 'inflate_reset_response_data':
            (0, inflate_1.inflateSuccess)(extraData.inflate);
            (0, dom_1.resetForm)(element);
            break;
        case 'inflate_redirect_response_data':
            (0, inflate_1.inflateSuccess)(extraData.inflate);
            (0, url_1.redirectTimeout)(extraData.redirect, 400);
            break;
        case 'load_html':
            if (status) {
                (0, inflate_1.inflateSuccess)(extraData.inflate);
            }
            $(`#${target}`).html(view);
            break;
        case 'api_response':
            if (customHideLoader) {
                (0, loader_1.hideLoader)('theGlobLoader');
            }
            break;
        default:
            (0, inflate_1.inflateSuccess)(app_1.Lang.getLangBags()?.action_success);
            (0, url_1.redirectTimeout)(extraData.redirect, 400);
    }
    if (afterLoad) {
        afterLoad(obj, response.data);
    }
}
//# sourceMappingURL=success.js.map