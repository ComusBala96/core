import { Config } from '../app';
import { AppConfig } from '../types';
import { Loader, Sweet } from '../utils';

export class Http {
    static ajax = {
        core(op: AppConfig, callBack: Function) {
            const { url = '/', payload = {}, method = 'POST', dataType = 'form', loader = true, token = null } = op;
            const app_url = Config.app_url + url;
            const csrf_token = Config.csrf_token;
            const app_env = Config.app_env;
            const config: JQuery.AjaxSettings = {
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

            if (loader) {
                Loader.show();
            }

            $.ajax(config)
                .done((res) => {
                    callBack(op, res);
                    Loader.hide();
                })
                .fail((xhr, status, error) => {
                    if (app_env) console.log(xhr, status, error);
                    Loader.hide();
                });
        },
        make(op: AppConfig, callback?: (op: AppConfig, res: unknown) => void): void {
            const { confirm, method, payload } = op;
            if (typeof callback === 'function') {
                if (confirm && method === 'PUT') {
                    Sweet.confirm().then(() => {
                        this.send(op, callback);
                    });
                    return;
                }
                if (confirm && method === 'DELETE' && payload && typeof payload === 'object' && 'ids' in payload) {
                    Sweet.deleteConfirm({ item: payload.ids }).then(() => {
                        this.send(op, callback);
                    });
                    return;
                }
            }
        },
        send(op: AppConfig, callBack: Function) {
            this.core(op, callBack);
        },
    };
    static axios = {
        core() {},
        make() {},
        send() {},
    };
}
