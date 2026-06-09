import { current, redirect, redirectTimeout, reload, reloadTimeout, reloadTable } from '../../helpers';
export class Url {
    static current(path) {
        return current(path);
    }
    static reloadTimeout(timeout) {
        return reloadTimeout(timeout ?? 1200);
    }
    static reload() {
        return reload();
    }
    static redirectTimeout(url, timeout) {
        return redirectTimeout(url, timeout ?? 1200);
    }
    static redirect(url) {
        return redirect(url);
    }
    static reloadTable(api) {
        return reloadTable(api);
    }
}
//# sourceMappingURL=url.js.map