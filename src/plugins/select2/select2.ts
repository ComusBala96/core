import 'select2';
import { MultiSelectOptions } from '../../types';


export function multi_select(op: MultiSelectOptions = {}) {
    const { element = 'select2', tags = false, placeholder = '' } = op;
    const selector = `.${element}`;
    $(selector).each(function (this: HTMLElement) {
        const $el = $(this);
        if ($el.hasClass('select2-hidden-accessible')) return;
        // @ts-ignore
        $el.select2({
            tags,
            tokenSeparators: [','],
            placeholder,
            allowClear: true,
            width: '100%',
        });
    });
}
