/* --------------------------------
DATE PICKERS
-------------------------------- */

import moment from "moment";
import { DatePickerOptions } from "../../types";


export function dp(op: DatePickerOptions = {}): void {
    // @ts-ignore
    $('.dp' as HTMLElement).datetimepicker({
        timepicker: false,
        scrollMonth: false,
        scrollInput: false,
        validateOnChange: false,
        ...op,
    });
}

export function tp(op: DatePickerOptions = {}): void {
    // @ts-ignore
    $('.tp' as any).datetimepicker({
        datepicker: false,
        step: 5,
        validateOnBlur: false,
        validateOnChange: false,
        ...op,
    });
}

export function bdtp(op: DatePickerOptions = {}): void {
    // @ts-ignore
    $('.bdtp' as any).datetimepicker({
        maxDate: moment(),
        scrollMonth: false,
        scrollInput: false,
        ...op,
    });
}

export function adtp(op: DatePickerOptions = {}): void {
    // @ts-ignore
    $('.adtp' as any).datetimepicker({
        minDate: moment(),
        scrollMonth: false,
        scrollInput: false,
        ...op,
    });
}

export function dtp(op: DatePickerOptions = {}): void {
    // @ts-ignore
    $('.dtp' as any).datetimepicker({
        scrollMonth: false,
        scrollInput: false,
        ...op,
    });
}
