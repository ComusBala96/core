"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multi_select = multi_select;
require("select2");
function multi_select(op) {
    if (typeof op === 'boolean') {
        op = {};
    }
    const { element = 'select2', tags = false, tokenSeparators = [','], placeholder = '', allowClear = true, width = '100%' } = op;
    const selector = `.${element}`;
    $(selector).each(function () {
        const $el = $(this);
        if ($el.hasClass('select2-hidden-accessible')) {
            return;
        }
        //@ts-ignore
        if (typeof $el.select2 !== 'function') {
            console.error('Select2 plugin not loaded');
            return;
        }
        //@ts-ignore
        $el.select2({
            tags,
            tokenSeparators,
            placeholder,
            allowClear,
            width,
        });
    });
}
//# sourceMappingURL=select2.js.map