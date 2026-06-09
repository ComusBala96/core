"use strict";
/* --------------------------------
DATE PICKERS
-------------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
exports.datepicker = datepicker;
exports.timepicker = timepicker;
exports.datetimepicker = datetimepicker;
function datepicker(op) {
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
function timepicker(op) {
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
function datetimepicker(op) {
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
//# sourceMappingURL=datetimepicker.js.map