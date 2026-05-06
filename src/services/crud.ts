import { bulkDelete, bulkUpdate } from '../resources';
import { downloadExcel, downloadPdf } from '../resources/download';
import { AppConfig, DataTableOptions } from '../types';

export class Crud {
    static create() {}
    static read() {}
    static update() {}
    static delete() {}
    static bulkUpdate<T extends typeof Crud>(this: T, op: AppConfig): T {
        bulkUpdate(op);
        return this;
    }
    static bulkDelete<T extends typeof Crud>(this: T, op: AppConfig): T {
        bulkDelete(op);
        return this;
    }
    static downloadPdf<T extends typeof Crud>(this: T, op: DataTableOptions): T {
        downloadPdf(op);
        return this;
    }
    static downloadExcel<T extends typeof Crud>(this: T, op: DataTableOptions): T {
        downloadExcel(op);
        return this;
    }
}
