import { Api } from 'datatables.net';
import { current, redirect, redirectTimeout, resetTable } from '../../helpers';

export class Url {
    static current(path?: string): string {
        return current(path);
    }

    static redirectTimeout(url: string, timeout?: number): void {
        return redirectTimeout(url, timeout ?? 1200);
    }
    static redirect(url: string): void {
        return redirect(url);
    }

    static resetTable(api: Api): void {
        return resetTable(api);
    }
}
