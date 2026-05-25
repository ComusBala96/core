import { Config } from '../../app';
import { Http } from '../../http';
import { AppConfig } from '../../types';
import { Dom, Guard } from '../../utils';

export function validate(op: AppConfig, callBack: undefined | ((op: AppConfig, res: Record<string, any>) => void)): void {
    const { element, rules = {}, messages = {}, afterValidation } = op;
    if (element) var $form = Dom.getElementById(element) as JQuery<HTMLFormElement> | HTMLFormElement;
    // @ts-ignore
    $form.validate({
        rules,
        messages: messages,
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
            if (!Guard.hasInternet()) return;
            const data = new FormData(form);
            const csrf_token = Config.csrf_token;
            const locale = Config.locale;
            if (csrf_token && locale) {
                data.append('_token', csrf_token);
                data.append('client', 'w');
                data.append('lang', locale);
            }
            Http.ajax.send({ ...op, payload: data }, callBack);
            return;
        },
    });
}
