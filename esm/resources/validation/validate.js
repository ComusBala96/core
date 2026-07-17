import { Lang } from '../../app';
import { Http } from '../../http';
import { Dom, Form, Guard, Obj, Sweet } from '../../utils';
export function validate(op, callBack) {
    const { element, rules = {}, messages = {}, afterValidation } = op;
    if (element)
        var $form = Dom.getElementById(element);
    // @ts-ignore
    return $form.validate({
        rules,
        messages: messages ?? Obj.getValidationMessages(rules),
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
            if (!Guard.hasInternet()) {
                Sweet.tost.error({ text: Lang.sweet.error.no_internet, timer: 300, position: 'center', });
                return;
            }
            Http.ajax.send(Obj.merge(op, { payload: Form.getData({ ...op, form }) }), callBack);
            return;
        },
    });
}
//# sourceMappingURL=validate.js.map