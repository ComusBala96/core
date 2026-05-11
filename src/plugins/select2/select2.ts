
import { MultiSelectOptions } from '../../types';
import $ from '../../lib/jquery/jquery';
import 'select2';
export function multi_select(op: MultiSelectOptions | boolean) {
    if (typeof op === 'boolean') {
        op = {};
    }
    const { element = 'select2', tags, tokenSeparators = [','], placeholder, allowClear = true, width = '100%' } = op;
    const selector = `.${element}`;
    $(selector).each(function (this: HTMLElement) {
        const $el = $(this);
        if ($el.hasClass('select2-hidden-accessible')) return;
        $el.select2({
            tags,
            tokenSeparators,
            placeholder,
            allowClear,
            width,
        });
    });
}
