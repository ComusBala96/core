"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Http = void 0;
const app_1 = require("../app");
const services_1 = require("../services");
const utils_1 = require("../utils");
class Http {
}
exports.Http = Http;
Http.ajax = {
    send(op, callBack) {
        const { confirm = false, deleteConfirm = false, payload, success } = op;
        if ((success?.type === 'load_html' && success?.reload) || success?.type === 'api_response') {
            if (success?.target && utils_1.Guard.domElement(success?.target)) {
                $(utils_1.Str.getSelector(success?.target)).html('');
            }
        }
        if (deleteConfirm) {
            if (app_1.Config.app_env) {
                console.log('Payload for delete confirmation:', payload);
            }
            if (payload && typeof payload === 'object' && 'ids' in payload) {
                utils_1.Sweet.deleteConfirm({ item: payload.ids }).then((result) => {
                    if (!result.isConfirmed)
                        return;
                    this.handleCallback(op, callBack);
                });
            }
            return;
        }
        if (confirm) {
            if (app_1.Config.app_env) {
                console.log('Payload for confirmation:', payload);
            }
            utils_1.Sweet.confirm().then((result) => {
                if (!result.isConfirmed)
                    return;
                this.handleCallback(op, callBack);
            });
            return;
        }
        if (!deleteConfirm && !confirm) {
            if (app_1.Config.app_env) {
                console.log('Payload for no confirm:', payload);
            }
            this.handleCallback(op, callBack);
            return;
        }
    },
    handleCallback(op, callBack) {
        const { beforeSend, afterSend, type = 'submit', success } = op;
        if (beforeSend) {
            beforeSend(op);
        }
        this.core(op, (op, res) => {
            if (app_1.Config.app_env) {
                console.log('handleCallback options:', op);
                console.log('handleCallback response:', res);
            }
            if (success?.afterSuccess) {
                success?.afterSuccess(op, res);
            }
            if (afterSend && res) {
                afterSend(op, res);
            }
            if (type === 'submit') {
                this.response(op, res, callBack);
            }
        });
    },
    response(op, res, callBack) {
        if (res?.success) {
            services_1.Success.handle(op, res);
        }
        else {
            services_1.Errors.handle(op, res);
        }
        if (typeof callBack === 'function') {
            callBack(op, res);
            return;
        }
    },
    core(op, callBack) {
        const { url = '/', payload = {}, method = 'POST', dataType = 'form', globLoader = true, token = null } = op;
        const app_url = app_1.Config.app_url + url;
        const csrf_token = app_1.Config.csrf_token;
        const app_env = app_1.Config.app_env;
        const config = {
            method: method,
            url: app_url,
            data: payload,
            contentType: false,
            cache: true,
            processData: false,
        };
        if (dataType === 'json') {
            config.dataType = 'json';
            config.headers = {
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
                Authorization: `Bearer ${csrf_token ?? token}`,
                'X-CSRF-Token': csrf_token ?? token,
            };
            config.data = JSON.stringify(payload);
            config.contentType = 'application/json; charset=utf-8';
        }
        if (globLoader) {
            utils_1.Loader.show();
        }
        if (app_env) {
            console.log('core config:', config);
            console.log('core options:', op);
        }
        $.ajax(config)
            .done((res) => {
            callBack(op, res);
            if (globLoader) {
                utils_1.Loader.hide();
            }
        })
            .fail((xhr, status, error) => {
            if (app_env) {
                console.log('xhr:', xhr);
                console.log('status:', status);
                console.log('error:', error);
            }
            if (xhr.status === 500) {
                utils_1.Sweet.error({ title: error + '\n' + 'Status Code: ' + xhr.status.toString(), html: xhr.responseText, width: '800px', animation: true });
            }
            if (globLoader) {
                utils_1.Loader.hide();
            }
        });
    },
};
Http.axios = {
    core() { },
    make() { },
    send() { },
};
//# sourceMappingURL=http.js.map