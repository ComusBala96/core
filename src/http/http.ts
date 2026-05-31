import { Config } from '../app';
import { Errors, Success } from '../services';
import { AppConfig } from '../types';
import { Guard, Loader, Str, Sweet } from '../utils';

export class Http {
    static ajax = {
        send(op: AppConfig, callBack?: undefined | ((op: AppConfig, res: Record<string, any>) => void)): void {
            const { confirm = false, deleteConfirm = false, payload, success } = op;
            if ((success?.type === 'load_html' && success?.reload) || success?.type === 'api_response') {
                if (success?.target && Guard.domElement(success?.target)) {
                    $(Str.getSelector(success?.target)).html('');
                }
            }
            if (deleteConfirm) {
                if (Config.app_env) {
                    console.log('Payload for delete confirmation:', payload);
                }
                if (payload && typeof payload === 'object' && 'ids' in payload) {
                    Sweet.deleteConfirm({ item: payload.ids }).then((result) => {
                        if (!result.isConfirmed) return;
                        this.handleCallback(op, callBack);
                    });
                }
                return;
            }
            if (confirm) {
                if (Config.app_env) {
                    console.log('Payload for confirmation:', payload);
                }
                Sweet.confirm().then((result) => {
                    if (!result.isConfirmed) return;
                    this.handleCallback(op, callBack);
                });
                return;
            }
            if (!deleteConfirm && !confirm) {
                if (Config.app_env) {
                    console.log('Payload for no confirm:', payload);
                }
                this.handleCallback(op, callBack);
                return;
            }
        },
        handleCallback(op: AppConfig, callBack?: undefined | ((op: AppConfig, res: Record<string, any>) => void)) {
            const { beforeSend, afterSend, type = 'submit', success } = op;
            if (beforeSend) {
                beforeSend(op);
            }
            this.core(op, (op, res) => {
                if (Config.app_env) {
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
        response(op: AppConfig, res: Record<string, any>, callBack?: (op: AppConfig, res: Record<string, any>) => void): void {
            if (res?.success) {
                Success.handle(op, res);
            } else {
                Errors.handle(op, res);
            }
            if (typeof callBack === 'function') {
                callBack(op, res);
                return;
            }
        },
        core(op: AppConfig, callBack: (op: AppConfig, res: Record<string, any>) => void) {
            const { url = '/', payload = {}, method = 'POST', dataType = 'form', globLoader = true, token = null } = op;
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

            if (globLoader) {
                Loader.show();
            }
            if (app_env) {
                console.log('core config:', config);
                console.log('core options:', op);
            }
            $.ajax(config)
                .done((res) => {
                    callBack(op, res);
                    if (globLoader) {
                        Loader.hide();
                    }
                })
                .fail((xhr, status, error) => {
                    if (app_env) {
                        console.log('xhr:', xhr);
                        console.log('status:', status);
                        console.log('error:', error);
                    }
                    if (xhr.status === 500) {
                        Sweet.error({ title: error + '\n' + 'Status Code: ' + xhr.status.toString(), html: xhr.responseText, width: '800px', animation: true });
                    }
                    if (globLoader) {
                        Loader.hide();
                    }
                });
        },
    };
    static axios = {
        core() {},
        make() {},
        send() {},
    };
}
