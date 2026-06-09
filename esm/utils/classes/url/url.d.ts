import { Api } from 'datatables.net';
export declare class Url {
    static current(path?: string): string;
    static reloadTimeout(timeout?: number): void;
    static reload(): void;
    static redirectTimeout(url: string, timeout?: number): void;
    static redirect(url: string): void;
    static reloadTable(api: Api): void;
}
//# sourceMappingURL=url.d.ts.map