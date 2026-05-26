import { Lang } from '../../app';
import { Http } from '../../http';
import { AppConfig } from '../../types';
import { Dom, Form, Guard, Obj, Sweet } from '../../utils';

export function validate(op: AppConfig, callBack: undefined | ((op: AppConfig, res: Record<string, any>) => void)): void {
    const { element, rules = {}, messages = {}, afterValidation } = op;
    if (element) var $form = Dom.getElementById(element) as JQuery<HTMLFormElement> | HTMLFormElement;
    // @ts-ignore
    $form.validate({
        rules,
        messages: messages ?? Obj.getValidationMessages(rules),
        ignore: ':hidden:not(textarea)',
        errorElement: 'em',
        errorPlacement(error: HTMLFormElement, el: HTMLFormElement) {
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
        highlight(el: HTMLFormElement) {
            $(el).addClass('border-yellow-400 placeholder:text-red-600 focus:border-yellow-400').removeClass('border-stroke placeholder:text-black focus:border-primary');
        },
        unhighlight(el: HTMLFormElement) {
            $(el).addClass('border-stroke placeholder:text-black focus:border-primary').removeClass('border-yellow-400 placeholder:text-red-600 focus:border-yellow-400');
        },
        submitHandler(form: HTMLFormElement) {
            if (afterValidation) {
                afterValidation(form, op);
                return;
            }
            if (!Guard.hasInternet()) {
                Sweet.tost.error({ text: Lang.sweet.error.no_internet, timer: 300, position: 'center', })
                return;
            }
            Http.ajax.send(Obj.merge(op, { payload: Form.getData({ ...op, form }) }), callBack);
            return;
        },
    });
}
