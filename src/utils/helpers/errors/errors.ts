import { error, xhrError } from '../alerts';
import { Config, Lang } from '../../../app';
import { inflateRequire } from '../success/inflate';
import { hideLoader, validationShow } from '../loader/loader';
import { AppConfig } from '../../../types';
import { Loader, Obj, Str } from '../../classes';

/**
 * Server Error.
 */
export function noServer(): void {
    error({
        html: `<span style="font-size: 16px;color: #ff0101;"> <i class="fa fa-exclamation-circle"></i>${Lang.errors.server_not_found} </span> <hr>
              <span style="font-size: 13px;color: #ff0101;"> Check your internet connection or try reload the page </span>`,
    });
}

export function validateErrors(errors: Record<string, string[]>) {
    for (const k in errors) {
        const parts = k.split('.');
        const id = parts.length === 1 ? `#${k}_error` : `#${parts[0]}\\.${parts[1]}_error`;
        $(id).addClass('text-red-600').html(errors[k][0]);
    }
}
export function bigErrors(res: Record<string, any[]>) {
    if (res.bigError) {
        let html = `<div style="margin-bottom:10px;font-size:14px;font-weight:300;">
            <ul style="padding-left:20px;display:flex;flex-direction:column;gap:2">
            <li style="color:red;">${Lang.alerts.went_wrong}</li>`;
        res.errors?.forEach((e) => {
            html += `<li style="color:red;text-decoration:none;">${e}</li>`;
        });
        html += '</ul></div>';
        Loader.displayErrors('showErrors', html);
    }
}

export function noUpdate(op: AppConfig): void {
    const { res = {} } = op;
    xhrError({ html: res.message });
}

export function xhrErrors(xhr: any) {
    const { status, responseJSON, responseText } = xhr;
    if (Config.app_env) {
        if (responseJSON !== undefined) {
            const html = `<div class="text-start text-xs text-red-600">${responseJSON?.message}  </div>`;
            xhrError({ html: html });
        } else if (status == 500) {
            const html = `<div class="text-start text-xs"> ${responseText}  </div>`;
            xhrError({ html: html });
        } else if (status !== 422) {
            const html = `<div class="text-start text-xs"> ${responseText?.message}  </div>`;
            xhrError({ html: html });
        }
    }
    if (status == 422) {
        const res = Obj.jsonParse(responseText);
        if (res?.errors !== undefined) {
            let errorHtml = '<ul class="text-danger text-start text-xs" style="margin-left: 1rem;">';
            for (const field in res.errors) {
                res.errors[field].forEach((msg: string) => {
                    errorHtml += `<li>${msg}</li>`;
                });
            }
            errorHtml += '</ul>';
            xhrError({ html: errorHtml });
        } else if (res?.message !== undefined) {
            const html = `<div class="text-start text-xs"> ${res?.message}  </div>`;
            xhrError({ html: html, width: '800px' });
        }
    }
}

export function displayAllErrors(op: AppConfig): void {
    const { res = {}, page = 'addPage', server = false } = op;
    const err = Lang.errors.inflate_error;
    const bigErr = Lang.errors.action_error;
    if (server) {
        $('#defaultPage').addClass('block').removeClass('hidden');
        $(Str.getSelector(page)).addClass('hidden').removeClass('block');
    }
    if (res.bigError) {
        let html = `<div style="margin-bottom:10px;font-size:14px;font-weight:300;">
            <ul style="padding-left:20px;display:flex;flex-direction:column;gap:2">
            <li style="color:red;">${bigErr}</li>`;

        res.bigErrors?.forEach((e: HTMLElement) => {
            html += `<li style="color:red;text-decoration:none;">${e}</li>`;
        });

        html += '</ul></div>';
        Loader.displayErrors('showErrors', html);
        inflateRequire(Lang.errors.action_error);
        hideLoader('theGlobalLoader');
    } else {
        if (res.noUpdate) {
            hideLoader('theGlobalLoader');
            noUpdate(op);
        } else {
            validationShow(res.errors || {});
            hideLoader('theGlobalLoader');
            if (!res.partial) {
                inflateRequire(res.msg ? `${err}<br>${res.msg}` : err);
            }
        }
    }
}
