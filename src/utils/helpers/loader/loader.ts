import { getElementById } from '../dom/dom';
export function showLoader(id: string) {
    const el = getElementById(id);
    el.addClass('activeGlobalLoader').css({ display: 'block' });
}
export function hideLoader(id: string): void {
    const el = getElementById(id);
    el.removeClass('activeGlobalLoader').css({ display: 'none' });
}
export function showErrors(id: string, html: string): void {
    const el = getElementById(id);
    el.html(html);
    $('#errorBase').addClass('activateErrors').fadeIn(500);
}

export function jsonShow(errors: Record<string, string[]>) {
    for (const k in errors) {
        const parts = k.split('.');
        const id = parts.length === 1 ? `#${k}_error` : `#${parts[0]}\\.${parts[1]}_error`;
        $(id).addClass('text-red-600').html(errors[k][0]);
    }
}