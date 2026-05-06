/**
 * URL Definitions.
 */
import { Config } from '../../../app';
import { normalize } from '../strings/strings';

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
    if (time) setTimeout(() => reload(), time);
}
/**
 * Timeout Redirect.
 */
export function redirectTimeout(path: string | null, time: number | null = 1200): void {
    if (time) setTimeout(() => redirect(path), time);
}

/**
 * Reload.
 */
export function reload(): void {
    if (window) window.location.reload();
    console.error('Something went wrong! Window not found!');
}
/**
 * Redirect.
 */
export function redirect(path: string | null): void {
    if (path) window.location.href = Config.app_url + normalize(path);
    console.error('Redirect URL not found!');
}
