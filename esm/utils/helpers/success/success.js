import { Config, Lang } from '../../../app';
import { resetForm } from '../dom';
import { displayAllErrors } from '../errors';
import { hideLoader } from '../loader';
import { redirectTimeout } from '../url';
import { inflateSuccess } from './inflate';
export function successor(op) {
    const { response = null, element = 'no', customHideLoader = true, status = true, afterSuccess = {} } = op;
    $(`#${element} label span`).html('').removeClass('text-red-600');
    if (Config.app_env) {
        console.log(response);
    }
    if (!response || typeof response !== 'object') {
        $('#theGlobalLoader').removeClass('activeGlobalLoader').hide();
        return;
    }
    if (!response.success) {
        displayAllErrors(op);
        return;
    }
    const extraData = response.data?.extraData ?? {
        inflate: Lang.getLangBags()?.no_message_return,
        redirect: window.location.href,
    };
    const view = response.data?.view ?? '';
    const { afterLoad, target = 'editView', type } = afterSuccess;
    const obj = { ...op, response };
    switch (type) {
        case 'inflate_response_data':
            inflateSuccess(extraData.inflate);
            break;
        case 'inflate_reset_response_data':
            inflateSuccess(extraData.inflate);
            resetForm(element);
            break;
        case 'inflate_redirect_response_data':
            inflateSuccess(extraData.inflate);
            redirectTimeout(extraData.redirect, 400);
            break;
        case 'load_html':
            if (status) {
                inflateSuccess(extraData.inflate);
            }
            $(`#${target}`).html(view);
            break;
        case 'api_response':
            if (customHideLoader) {
                hideLoader('theGlobLoader');
            }
            break;
        default:
            inflateSuccess(Lang.getLangBags()?.action_success);
            redirectTimeout(extraData.redirect, 400);
    }
    if (afterLoad) {
        afterLoad(obj, response.data);
    }
}
//# sourceMappingURL=success.js.map