"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const core_1 = require("@orians/core");
const app_1 = require("../../app");
const services_1 = require("../../services");
const utils_1 = require("../../utils");
/* --------------------------------
Modal
-------------------------------- */
class Modal {
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
                <img src="${app_1.Config.app_url + app_1.Config.meta_image.loader}"
                style="width:20px;height:20px;"> Loading...
            </div>
        `);
        if (core_1.Guard.domElement('.app-modal')) {
            services_1.App.create({
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
                        if (app_1.Config.app_env) {
                            console.log('modal option:', op);
                            console.log('modal response:', res);
                        }
                        if (typeof op === 'object') {
                            const { title, modalCallback = undefined, globLoader = true } = op;
                            if (res?.success) {
                                const { view = 'reached' } = res;
                                if (globLoader) {
                                    utils_1.Loader.show();
                                }
                                if (title) {
                                    $('.modal-title').html(title);
                                }
                                if (view) {
                                    $('.modal-body').html(view);
                                }
                                if (modalCallback && typeof window[modalCallback] === 'function') {
                                    window[modalCallback](utils_1.Obj.merge(op, { api: services_1.App.dataTableApi }), res);
                                    if (globLoader) {
                                        utils_1.Loader.hide();
                                    }
                                }
                            }
                        }
                        else {
                            utils_1.Loader.hide();
                        }
                    },
                },
            });
        }
    }
}
exports.Modal = Modal;
//# sourceMappingURL=modal.js.map