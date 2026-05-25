/* --------------------------------
DATE PICKERS
-------------------------------- */

export function datepicker(op: Record<string, any> | boolean): void {
    if (typeof op === 'boolean') {
        op = {};
    }
    const { element = 'datepicker', ...rest } = op;
    const selector = `.${element}`;
    //@ts-ignore
    $(selector).each(function () {
        //@ts-ignore
        const $el = $(this);
        //@ts-ignore
        if (typeof $el.datetimepicker !== 'function') {
            console.error('datepicker plugin not loaded');
            return;
        }
        //@ts-ignore
        $el.datetimepicker({
            timepicker: false,
            scrollMonth: false,
            scrollInput: false,
            validateOnChange: false,
            ...rest,
        });
    });
}
export function timepicker(op: Record<string, any> | boolean): void {
    if (typeof op === 'boolean') {
        op = {};
    }
    const { element = 'timepicker', ...rest } = op;
    const selector = `.${element}`;
    //@ts-ignore
    $(selector).each(function () {
        //@ts-ignore
        const $el = $(this);
        //@ts-ignore
        if (typeof $el.datetimepicker !== 'function') {
            console.error('timepicker plugin not loaded');
            return;
        }
        //@ts-ignore
        $el.datetimepicker({
            datepicker: false,
            step: 5,
            validateOnBlur: false,
            validateOnChange: false,
            ...rest,
        });
    });
}
export function datetimepicker(op: Record<string, any> | boolean): void {
    if (typeof op === 'boolean') {
        op = {};
    }
    const { element = 'datetimepicker', ...rest } = op;
    const selector = `.${element}`;
    //@ts-ignore
    $(selector).each(function () {
        //@ts-ignore
        const $el = $(this);
        //@ts-ignore
        if (typeof $el.datetimepicker !== 'function') {
            console.error('datetimepicker plugin not loaded');
            return;
        }
        //@ts-ignore
        $el.datetimepicker({
            scrollMonth: false,
            scrollInput: false,
            ...rest,
        });
    });
}
