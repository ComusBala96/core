import { Api } from 'datatables.net';
import { current, redirect, redirectTimeout, reload, reloadTimeout, reloadTable } from '../../helpers';

export class Url {
    static current(path?: string): string {
        return current(path);
    }
    static reloadTimeout(timeout?: number): void {
        return reloadTimeout(timeout ?? 1200);
    }
    static reload(): void {
        return reload();
    }

    static redirectTimeout(url: string, timeout?: number): void {
        return redirectTimeout(url, timeout ?? 1200);
    }
    static redirect(url: string): void {
        return redirect(url);
    }

    static reloadTable(api: Api): void {
        return reloadTable(api);
    }
}
