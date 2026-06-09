"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormData = getFormData;
exports.resetForm = resetForm;
const app_1 = require("../../../app");
const dom_1 = require("./dom");
function getFormData(op) {
    const { form = null, payload = {} } = op;
    const csrf_token = app_1.Config.csrf_token;
    const client = 'w';
    const locale = app_1.Config.locale;
    const fallback = {
        ...payload,
        _token: csrf_token,
        client: client,
        lang: locale,
    };
    try {
        if (form) {
            const data = new FormData(form);
            if (csrf_token && locale) {
                data.append('_token', csrf_token);
                data.append('client', client);
                data.append('lang', locale);
                return data;
            }
        }
        return fallback;
    }
    catch (error) {
        console.error('[getFormData] Failed to build payload:', error);
        return fallback;
    }
}
function resetForm(formId) {
    const form = (0, dom_1.getElementById)(formId).get(0);
    if (app_1.Config.app_env) {
        console.log('Form:', form);
    }
    if (form)
        form.reset();
}
//# sourceMappingURL=form.js.map