"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noServer = noServer;
exports.validateErrors = validateErrors;
exports.bigErrors = bigErrors;
exports.noUpdate = noUpdate;
exports.xhrErrors = xhrErrors;
exports.displayAllErrors = displayAllErrors;
const alerts_1 = require("../alerts");
const app_1 = require("../../../app");
const inflate_1 = require("../success/inflate");
const loader_1 = require("../loader/loader");
const classes_1 = require("../../classes");
/**
 * Server Error.
 */
function noServer() {
    (0, alerts_1.error)({
        html: `<span style="font-size: 16px;color: #ff0101;"> <i class="fa fa-exclamation-circle"></i>${app_1.Lang.errors.server_not_found} </span> <hr>
              <span style="font-size: 13px;color: #ff0101;"> Check your internet connection or try reload the page </span>`,
    });
}
function validateErrors(errors) {
    for (const k in errors) {
        const parts = k.split('.');
        const id = parts.length === 1 ? `#${k}_error` : `#${parts[0]}\\.${parts[1]}_error`;
        $(id).addClass('text-red-600').html(errors[k][0]);
    }
}
function bigErrors(res) {
    if (res.bigError) {
        let html = `<div style="margin-bottom:10px;font-size:14px;font-weight:300;">
            <ul style="padding-left:20px;display:flex;flex-direction:column;gap:2">
            <li style="color:red;">${app_1.Lang.alerts.went_wrong}</li>`;
        res.errors?.forEach((e) => {
            html += `<li style="color:red;text-decoration:none;">${e}</li>`;
        });
        html += '</ul></div>';
        classes_1.Loader.displayErrors('showErrors', html);
    }
}
function noUpdate(op) {
    const { res = {} } = op;
    (0, alerts_1.xhrError)({ html: res.message });
}
function xhrErrors(xhr) {
    const { status, responseJSON, responseText } = xhr;
    if (app_1.Config.app_env) {
        if (responseJSON !== undefined) {
            const html = `<div class="text-start text-xs text-red-600">${responseJSON?.message}  </div>`;
            (0, alerts_1.xhrError)({ html: html });
        }
        else if (status == 500) {
            const html = `<div class="text-start text-xs"> ${responseText}  </div>`;
            (0, alerts_1.xhrError)({ html: html });
        }
        else if (status !== 422) {
            const html = `<div class="text-start text-xs"> ${responseText?.message}  </div>`;
            (0, alerts_1.xhrError)({ html: html });
        }
    }
    if (status == 422) {
        const res = classes_1.Obj.jsonParse(responseText);
        if (res?.errors !== undefined) {
            let errorHtml = '<ul class="text-danger text-start text-xs" style="margin-left: 1rem;">';
            for (const field in res.errors) {
                res.errors[field].forEach((msg) => {
                    errorHtml += `<li>${msg}</li>`;
                });
            }
            errorHtml += '</ul>';
            (0, alerts_1.xhrError)({ html: errorHtml });
        }
        else if (res?.message !== undefined) {
            const html = `<div class="text-start text-xs"> ${res?.message}  </div>`;
            (0, alerts_1.xhrError)({ html: html, width: '800px' });
        }
    }
}
function displayAllErrors(op) {
    const { res = {}, page = 'addPage', server = false } = op;
    const err = app_1.Lang.errors.inflate_error;
    const bigErr = app_1.Lang.errors.action_error;
    if (server) {
        $('#defaultPage').addClass('block').removeClass('hidden');
        $(classes_1.Str.getSelector(page)).addClass('hidden').removeClass('block');
    }
    if (res.bigError) {
        let html = `<div style="margin-bottom:10px;font-size:14px;font-weight:300;">
            <ul style="padding-left:20px;display:flex;flex-direction:column;gap:2">
            <li style="color:red;">${bigErr}</li>`;
        res.bigErrors?.forEach((e) => {
            html += `<li style="color:red;text-decoration:none;">${e}</li>`;
        });
        html += '</ul></div>';
        classes_1.Loader.displayErrors('showErrors', html);
        (0, inflate_1.inflateRequire)(app_1.Lang.errors.action_error);
        (0, loader_1.hideLoader)('theGlobalLoader');
    }
    else {
        if (res.noUpdate) {
            (0, loader_1.hideLoader)('theGlobalLoader');
            noUpdate(op);
        }
        else {
            (0, loader_1.validationShow)(res.errors || {});
            (0, loader_1.hideLoader)('theGlobalLoader');
            if (!res.partial) {
                (0, inflate_1.inflateRequire)(res.msg ? `${err}<br>${res.msg}` : err);
            }
        }
    }
}
//# sourceMappingURL=errors.js.map