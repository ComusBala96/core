"use strict";
/**
 * Page action is used for load add new page and create new entry.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageAction = pageAction;
const http_1 = require("../http");
const utils_1 = require("../utils");
function pageAction() {
    $('.viewAction')
        .off('click')
        .on('click', function () {
        const prop = utils_1.Obj.jsonParse($(this).attr('data-prop') || '{}');
        const { page = 'addPage', server = 'no', method = 'post', type = 'request', target = 'loadEdit', afterSuccess = { type: 'load_html' }, dataType = 'json' } = prop;
        $('.pages').addClass('hidden').removeClass('block');
        $(utils_1.Str.getSelector(page)).removeClass('hidden').addClass('block');
        if (server === 'yes') {
            const op = utils_1.Obj.merge(prop, { type, method, afterSuccess, target, dataType, server });
            http_1.Http.ajax.send(op);
        }
    });
    $('.closeAction')
        .off('click')
        .on('click', function () {
        const target = $(this).attr('data-cl-action');
        $('.pages').addClass('hidden').removeClass('block');
        if (target)
            $(utils_1.Str.getSelector(target)).removeClass('hidden').addClass('block');
    });
}
//# sourceMappingURL=dom.js.map