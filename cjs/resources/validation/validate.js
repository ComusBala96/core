"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const app_1 = require("../../app");
const http_1 = require("../../http");
const utils_1 = require("../../utils");
function validate(op, callBack) {
    const { element, rules = {}, messages = {}, afterValidation } = op;
    if (element)
        var $form = utils_1.Dom.getElementById(element);
    // @ts-ignore
    $form.validate({
        rules,
        messages: messages ?? utils_1.Obj.getValidationMessages(rules),
        ignore: ':hidden:not(textarea)',
        errorElement: 'em',
        errorPlacement(error, el) {
            error.addClass('text-red-600');
            if (el.prop('type') === 'checkbox') {
                error.insertAfter(el.parent().last());
                return;
            }
            if (el.prop('type') === 'radio') {
                error.insertAfter(el.parent().parent().find('span'));
                return;
            }
            error.insertAfter(el);
        },
        highlight(element) {
            $(element).removeClass('border-stroke focus:border-primary placeholder:text-black').addClass('border-yellow-400 focus:border-yellow-400 placeholder:text-red-600');
        },
        unhighlight(element) {
            $(element).removeClass('border-yellow-400 focus:border-yellow-400 placeholder:text-red-600').addClass('border-stroke focus:border-primary placeholder:text-black');
        },
        submitHandler(form) {
            if (afterValidation) {
                afterValidation(form, op);
                return;
            }
            if (!utils_1.Guard.hasInternet()) {
                utils_1.Sweet.tost.error({ text: app_1.Lang.sweet.error.no_internet, timer: 300, position: 'center', });
                return;
            }
            http_1.Http.ajax.send(utils_1.Obj.merge(op, { payload: utils_1.Form.getData({ ...op, form }) }), callBack);
            return;
        },
    });
}
//# sourceMappingURL=validate.js.map