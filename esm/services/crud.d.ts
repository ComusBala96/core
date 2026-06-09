import { AppConfig, DataTableOptions } from '../types';
export declare class Crud {
    static create(): void;
    static read(): void;
    static update(): void;
    static delete(): void;
    static bulkUpdate<T extends typeof Crud>(this: T, op: AppConfig): T;
    static bulkDelete<T extends typeof Crud>(this: T, op: AppConfig): T;
    static downloadPdf<T extends typeof Crud>(this: T, op: DataTableOptions): T;
    static downloadExcel<T extends typeof Crud>(this: T, op: DataTableOptions): T;
}
//# sourceMappingURL=crud.d.ts.map