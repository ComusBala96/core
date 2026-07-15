import { Guard } from '@orians/core';
import { Config } from '../../app';
import { App } from '../../services';
import { Loader, Obj } from '../../utils';
/* --------------------------------
Modal
-------------------------------- */
export class Modal {
    static request(op) {
        const { element = 'NA', url = '/', payload = {}, title = 'No title provided', width = '768px', height = 'auto', maxWidth = '90vw', maxHeight = '90vh', dialogClass = '', ...rest } = op;
        const $dialog = $('.app-modal .modal-dialog');
        const $content = $dialog.children().first();
        $dialog.removeAttr('style');
        $content.removeAttr('style');
        $dialog.removeClass(function (_, cls) {
            return (cls.match(/max-w-\S+/g) || []).join(' ');
        });
        if (dialogClass) {
            $dialog.addClass(dialogClass);
        }
        $dialog.css({
            width,
            maxWidth,
        });
        $content.css({
            height,
            maxHeight,
        });
        /* loading UI */
        $('.modal-body').html(`
            <div class="w-full flex justify-center items-center">
                <img src="${Config.app_url + Config.meta_image.loader}"
                style="width:20px;height:20px;"> Loading...
            </div>
        `);
        if (Guard.domElement('.app-modal')) {
            App.create({
                ...rest,
                element: '.app-modal',
                url: url,
                payload: payload,
                dataType: 'json',
                type: 'request',
                title: title,
                success: {
                    type: 'api_response',
                    load_view: true,
                    target: '.modal-body',
                    afterSuccess: (op, res) => {
                        if (Config.app_env) {
                            console.log('modal option:', op);
                            console.log('modal response:', res);
                        }
                        if (typeof op === 'object') {
                            const { title, modalCallback = undefined, globLoader = true } = op;
                            if (res?.success) {
                                const { view = 'reached' } = res;
                                if (globLoader) {
                                    Loader.show();
                                }
                                if (title) {
                                    $('.modal-title').html(title);
                                }
                                if (view) {
                                    $('.modal-body').html(view);
                                }
                                if (modalCallback && typeof window[modalCallback] === 'function') {
                                    window[modalCallback](Obj.merge(op, { api: App.dataTableApi }), res);
                                    if (globLoader) {
                                        Loader.hide();
                                    }
                                }
                            }
                        }
                        else {
                            Loader.hide();
                        }
                    },
                },
            });
        }
    }
}
//# sourceMappingURL=modal.js.map