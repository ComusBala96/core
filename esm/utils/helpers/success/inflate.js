import { hideLoader } from "../loader/loader";
export function inflateSuccess(msg) {
    if (msg) {
        const d = `<div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">${msg}</div>`;
        $('#inflate').append(d);
    }
    const t = setTimeout(() => {
        $('#inflate').html('');
        clearTimeout(t);
        hideLoader('theGlobalLoader');
    }, 500);
}
export function inflateRequire(msg) {
    if (msg) {
        const d = `<div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">${msg}</div>`;
        $('#inflate').append(d);
    }
    const t = setTimeout(() => {
        $('#inflate').html('');
        clearTimeout(t);
        hideLoader('theGlobalLoader');
    }, 500);
}
//# sourceMappingURL=inflate.js.map