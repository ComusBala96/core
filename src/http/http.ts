import { Config } from '../app';
import { Success } from '../services/success';
import { AppConfig } from '../types';
import { Loader, Sweet } from '../utils';

export class Http {
    static ajax = {
        make(op: AppConfig, callback?: undefined | ((op: AppConfig, res: Record<string, any>) => void)): void {
            const { confirm, method, payload } = op;
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

        },
        send(op: AppConfig, callBack?: undefined | ((op: AppConfig, res: Record<string, any>) => void)): void {
            const { confirm = false, success, beforeSend } = op;
            if ((success?.type === 'load_html' && success?.reload) || success?.type === 'api_response') {
                const { target = 'none' } = success || {};
                if (target !== 'none') {
                    $(`#${target}`).html('');
                }
            }

            if (confirm) {
                Sweet.confirm().then((result) => {
                    if (!result.isConfirmed) return;
                    this.send(op, ( op, res) => {
                        callBack ? callBack(op, res) : Success.handle(op, res);
                    });

                });
            } else {
                if (beforeSend) {
                    beforeSend(op, (op) =>
                        this.send(op, (op, res) => {
                            callBack ? callBack(op, res) : Success.handle(op, res);
                        }),
                    );
                } else {
                    this.send(op, (op, res) => {
                        callBack ? callBack(op, res) : Success.handle(op, res);
                    });
                }
            }

            // this.core(op, (op, res) => {
            //     if (typeof callBack === 'function') {
            //         callBack(op, res);
            //         return;
            //     }
            //     if (res.success) {
            //         Success.handle(op, res);
            //     } else {
            //         Errors.handle(op, res);
            //     }

            // });
        },
        core(op: AppConfig, callBack: (op: AppConfig, res: Record<string, any>) => void) {
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
                    if (app_env) {
                        console.log("xhr:", xhr);
                        console.log("status:", status);
                        console.log("error:", error);
                    }
                    if (xhr.status === 500) {
                        Sweet.error({ title: error + '\n' + 'Status Code: ' + xhr.status.toString(), html: xhr.responseText, width: '800px', animation: true })
                    }
                    Loader.hide();
                });
        },
    };
    static axios = {
        core() { },
        make() { },
        send() { },
    };
}
