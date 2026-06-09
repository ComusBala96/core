/**
 * Page action is used for load add new page and create new entry.
 *
 */
import { Http } from '../http';
import { Obj, Str } from '../utils';
export function pageAction() {
    $('.viewAction')
        .off('click')
        .on('click', function () {
        const prop = Obj.jsonParse($(this).attr('data-prop') || '{}');
        const { page = 'addPage', server = 'no', method = 'post', type = 'request', target = 'loadEdit', afterSuccess = { type: 'load_html' }, dataType = 'json' } = prop;
        $('.pages').addClass('hidden').removeClass('block');
        $(Str.getSelector(page)).removeClass('hidden').addClass('block');
        if (server === 'yes') {
            const op = Obj.merge(prop, { type, method, afterSuccess, target, dataType, server });
            Http.ajax.send(op);
        }
    });
    $('.closeAction')
        .off('click')
        .on('click', function () {
        const target = $(this).attr('data-cl-action');
        $('.pages').addClass('hidden').removeClass('block');
        if (target)
            $(Str.getSelector(target)).removeClass('hidden').addClass('block');
    });
}
//# sourceMappingURL=dom.js.map