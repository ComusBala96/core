// import { Api } from 'datatables.net-dt';
// import { loadDataTable, tomSelect, jodit, datepicker, datetimepicker, timepicker, swiper } from '../plugins';
// import { AppConfig, DataTableOptions, DownloadExcelOptions, ExcelConfig, PdfConfig } from '../types';
// import { Guard } from '../utils';
// import { Crud } from './crud';
import { Ajax } from './ajax';

import { AppConfig } from "../types";

export class App {
    static config: AppConfig = {};
    // static deleteConfig: AppConfig = {};
    // static updateConfig: AppConfig = {};
    // static pdfConfig: PdfConfig = {};
    // static excelConfig: ExcelConfig = {};
    static beforeSuccessHandler?: undefined | ((op: AppConfig, res: Record<string, any>) => void);
    static successHandler?: undefined | ((op: AppConfig, res: Record<string, any>) => void);
    static afterSuccessHandler?: undefined | ((op: AppConfig, res: Record<string, any>) => void);

    // protected static boot(config: AppConfig): void {
    //     this.config = config;
    //     if (typeof this.config?.element === 'string' && this.config?.element !== '')
    //         if (Guard.hasElement(this.config?.element)) {
    //             // Plugin dataTable
    //             if (Guard.isPlugin(this.config?.plugin) && this.config?.plugin?.dataTable) {
    //                 loadDataTable(this.config?.element, this.config);
    //             }
    //             // ajax request
    //             if (Guard.isPlugin(this.config?.plugin) && this.config?.validation) {
    //                 Ajax.post(this.config);
    //             }
    //             if (!Guard.isPlugin(this.config?.plugin)) {
    //                 Ajax.make(this.config);
    //             }
    //         }
    // }
    // protected static bootPlugin(): void {
    //     if (this.config?.plugin?.select) {
    //         tomSelect(this.config?.plugin?.select);
    //     }
    //     if (this.config?.plugin?.jodit) {
    //         jodit(this.config?.plugin?.jodit);
    //     }
    //     if (this.config?.plugin?.datepicker) {
    //         datepicker(this.config?.plugin?.datepicker);
    //     }
    //     if (this.config?.plugin?.timepicker) {
    //         timepicker(this.config?.plugin?.timepicker);
    //     }
    //     if (this.config?.plugin?.datetimepicker) {
    //         datetimepicker(this.config?.plugin?.datetimepicker);
    //     }
    //     if (this.config?.plugin?.swiper) {
    //         swiper(this.config?.plugin?.swiper);
    //     }
    // }
    // protected static bootTable(): void {
    //     const el = this.config?.element;
    //     if (typeof el !== 'string' || !el) return;
    //     (window as any)[el] = (_table: string, api: Api<any>, op: DataTableOptions) => {
    //         // PDF
    //         if (this.pdfConfig?.btn) {
    //             Crud.downloadPdf({ ...op, ...this.pdfConfig } as DataTableOptions);
    //         }
    //         // Excel
    //         if (this.excelConfig?.btn) {
    //             Crud.downloadExcel({ ...op, ...this.excelConfig } as DownloadExcelOptions);
    //         }
    //         // BULK Update
    //         if (this.updateConfig?.element) {
    //             Crud.bulkUpdate({ ...this.updateConfig, api });
    //         }
    //         // BULK Delete
    //         if (this.deleteConfig?.element) {
    //             Crud.bulkDelete({ ...this.deleteConfig, api });
    //         }
    //     };
    // }
    // static table<T extends typeof App>(this: T, config: AppConfig): T {
    //     this.boot(config);
    //     this.bootTable();
    //     return this;
    // }
    // static request<T extends typeof App>(this: T, config: AppConfig): T {
    //     this.config = config;
    //     Ajax.make(this.config);
    //     return this;
    // }
    // static submit<T extends typeof App>(this: T, config: AppConfig): T {
    //     this.config = config;
    //     Ajax.post(this.config);
    //     return this;
    // }
    // static create<T extends typeof App>(this: T, config: AppConfig): T {
    //     this.boot(config);
    //     this.bootPlugin();
    //     return this;
    // }
    // static update<T extends typeof App>(this: T, config: AppConfig): T {
    //     this.config = config;
    //     return this;
    // }
    // static destroy<T extends typeof App>(this: T, config: AppConfig): T {
    //     this.config = config;
    //     return this;
    // }
    // static bulkUpdate<T extends typeof App>(this: T, config: AppConfig): T {
    //     this.updateConfig = config;
    //     return this;
    // }
    // static bulkDelete<T extends typeof App>(this: T, config: AppConfig): T {
    //     this.deleteConfig = config;
    //     return this;
    // }
    // static downloadPdf<T extends typeof App>(this: T, config: PdfConfig): T {
    //     this.pdfConfig = config;

    //     return this;
    // }
    // static downloadExcel<T extends typeof App>(this: T, config: ExcelConfig): T {
    //     this.excelConfig = config;
    //     return this;
    // }
    // static beforeSuccess<T extends typeof App>(this: T, callback: (op: AppConfig, res: unknown) => void): T {
    //     this.beforeSuccessHandler = callback;
    //     return this;
    // }
    // static success<T extends typeof App>(this: T, callback: (op: AppConfig, res: unknown) => void): T {
    //     this.successHandler = callback;
    //     return this;
    // }
    // static onSuccess<T extends typeof App>(this: T, callback: (op: AppConfig, res: unknown) => void): T {
    //     this.successHandler = callback;
    //     return this;
    // }
    // static afterSuccess<T extends typeof App>(this: T, callback: (op: AppConfig, res: unknown) => void): T {
    //     this.afterSuccessHandler = callback;
    //     return this;
    // }
    // static plugin<T extends typeof App>(this: T, config: AppConfig): T {
    //     this.config = config;
    //     this.bootPlugin();
    //     return this;
    // }
    // static legacy<T extends typeof App>(this: T, config: AppConfig, callback: Function): T {
    //     const { } = config;
    //     callback();
    //     return this;
    // }
    static post<T extends typeof App>(this: T, config: AppConfig): T {
        this.config = config;
        Ajax.post(this.config);
        return this;
    }
}
