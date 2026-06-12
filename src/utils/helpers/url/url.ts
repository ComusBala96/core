/**
 * URL Definitions.
 */
import { Api } from 'datatables.net';
import { Config } from '../../../app';
import { normalize } from '../strings/strings';
import { Str } from '../../classes';

/**
 * Get current url.
 */
export function current(path?: string): string {
    if (path) return normalize(path);
    return normalize(window.location.pathname);
}

/**
 * Timeout Reload.
 */
export function reloadTimeout(time: number | null = 1200): void {
    if (time) {
        setTimeout(() => reload(), time);
        return;
    }
    console.error('Time not found!');
}
/**
 * Timeout Redirect.
 */
export function redirectTimeout(path: string | null, time: number | null = 1200): void {
    if (time) {
        setTimeout(() => redirect(path), time);
        return;
    }
    console.error('Time not found!');
}

/**
 * Reload.
 */
export function reload(): void {
    if (window) {
        window.location.reload();
        return;
    }
    console.error('Something went wrong! Window not found!');
}
/**
 * Redirect.
 */
export function redirect(path: string | null): void {
    if (path) {
        if (Config.app_env) {
            console.log(normalize(path));
        }
        window.location.href = Config.app_url + normalize(path);
        return;
    }
    console.error('Redirect URL not found!');
}

export function reloadTable(api: Api): void {
    if (api) {
        $(Str.getSelector('show_selected')).html('');
        $(Str.getSelector('show_selected_base')).addClass('hidden');
        api.ajax.reload();
        return;
    }
    console.error('API not found!');
}
