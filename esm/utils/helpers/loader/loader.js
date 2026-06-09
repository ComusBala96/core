import { Config } from '../../../app';
import { getElementById } from '../dom/dom';
export function showLoader(id) {
    const el = getElementById(id);
    el.addClass('activeGlobalLoader').css({ display: 'block' });
}
export function hideLoader(id) {
    const el = getElementById(id);
    el.removeClass('activeGlobalLoader').css({ display: 'none' });
}
export function displayErrors(id, html) {
    const el = getElementById(id);
    el.html(html);
    $('#errorBase').addClass('activateErrors').fadeIn(500);
}
export function validationShow(errors) {
    for (const k in errors) {
        if (Config.app_env) {
            console.log('validation error key:', k);
            console.log('validation error message:', errors[k][0]);
        }
        const parts = k.split('.');
        const id = parts.length === 1 ? `#${k}_error` : `#${parts[0]}\\.${parts[1]}_error`;
        $(id).html(errors[k][0]);
    }
}
//# sourceMappingURL=loader.js.map