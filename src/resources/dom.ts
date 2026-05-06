/**
 * Page action is used for load add new page and create new entry.
 *
 */


import { Http } from "../http";
import { AppConfig } from "../types";
import { Obj } from "../utils";

export function pageAction(): void {
    $('.viewAction')
        .off('click')
        .on('click', function (this: HTMLElement) {
            const prop: AppConfig = JSON.parse(($(this).attr('data-prop') as string) || '{}');
            const { page = 'addPage', server = 'no', method = 'post', type = 'request', target = 'loadEdit', afterSuccess = { type: 'load_html' }, dataType = 'json' } = prop;
            $('.pages').addClass('hidden').removeClass('block');
            $('#' + page)
                .removeClass('hidden')
                .addClass('block');
            if (server === 'yes') {
                const op = Obj.merge(prop, { type, method, afterSuccess, target, dataType, server });
                Http.ajax.make(op);
            }
        });

    $('.closeAction')
        .off('click')
        .on('click', function (this: HTMLElement) {
            const target = $(this).attr('data-cl-action');
            $('.pages').addClass('hidden').removeClass('block');
            $('#' + target)
                .removeClass('hidden')
                .addClass('block');
        });
}