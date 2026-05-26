import { Api } from 'datatables.net-dt';
import { loadDataTable, tomSelect, jodit, datepicker, datetimepicker, timepicker, swiper } from '../plugins';
import { AppConfig, DataTableOptions, DownloadExcelOptions, ExcelConfig, PdfConfig } from '../types';
import { Guard } from '../utils';
import { Crud } from './crud';
import { Ajax } from './ajax';
import { Config } from '../app';

export class App {
    static config: AppConfig = {};
    static deleteConfig: AppConfig = {};
    static updateConfig: AppConfig = {};
    static pdfConfig: PdfConfig = {};
    static excelConfig: ExcelConfig = {};
    static beforeSuccessHandler?: undefined | ((op: AppConfig, res: Record<string, any>) => void);
    static successHandler?: undefined | ((op: AppConfig, res: Record<string, any>) => void);
    static afterSuccessHandler?: undefined | ((op: AppConfig, res: Record<string, any>) => void);

    protected static boot(config: AppConfig): void {
        this.config = config;
        if (typeof this.config?.element === 'string' && this.config?.element !== '')
            if (Guard.hasElement(this.config?.element)) {
                // Plugins dataTable
                if (Guard.isPlugin(this.config?.plugins) && this.config?.plugins?.dataTable) {
                    loadDataTable(this.config?.element, this.config);
                }
                // ajax request
                if (Guard.isPlugin(this.config?.plugins) && this.config?.validation) {
                    Ajax.post(this.config);
                }
                if (!Guard.isPlugin(this.config?.plugins)) {
                    Ajax.make(this.config);
                }
            }
    }
    protected static bootPlugin(): void {
        if (this.config?.plugins?.select) {
            tomSelect(this.config?.plugins?.select);
        }
        if (this.config?.plugins?.jodit) {
            jodit(this.config?.plugins?.jodit);
        }
        if (this.config?.plugins?.datepicker) {
            datepicker(this.config?.plugins?.datepicker);
        }
        if (this.config?.plugins?.timepicker) {
            timepicker(this.config?.plugins?.timepicker);
        }
        if (this.config?.plugins?.datetimepicker) {
            datetimepicker(this.config?.plugins?.datetimepicker);
        }
        if (this.config?.plugins?.swiper) {
            swiper(this.config?.plugins?.swiper);
        }
    }
    protected static bootTable(): void {
        const el = this.config?.element;
        if (typeof el !== 'string' || !el) return;
        (window as any)[el] = (_table: string, api: Api<any>, op: DataTableOptions) => {
            // PDF
            if (this.pdfConfig?.btn) {
                Crud.downloadPdf({ ...op, ...this.pdfConfig } as DataTableOptions);
            }
            // Excel
            if (this.excelConfig?.btn) {
                Crud.downloadExcel({ ...op, ...this.excelConfig } as DownloadExcelOptions);
            }
            // BULK Update
            if (this.updateConfig?.element) {
                Crud.bulkUpdate({ ...this.updateConfig, api });
            }
            // BULK Delete
            if (this.deleteConfig?.element) {
                Crud.bulkDelete({ ...this.deleteConfig, api });
            }
        };
    }
    static table<T extends typeof App>(this: T, config: AppConfig): T {
        this.boot(config);
        this.bootTable();
        return this;
    }
    static submit<T extends typeof App>(this: T, config: AppConfig): T {
        try {
            if (Guard.isObject(config) && !Guard.isEmpty(config)) {
                if (Config.app_env) {
                    console.log('App.submit method called with config:', config);
                }
                this.config = config;
                Ajax.post(this.config);
            } else {
                throw new Error('Invalid configuration for App.submit method. Please provide a valid AppConfig object.');
            }
        } catch (error) {
            throw new Error(`App.submit method failed: ${(error as Error).message}`);
        }
        return this;
    }
    static request<T extends typeof App>(this: T, config: AppConfig): T {
        this.config = config;
        Ajax.make(this.config);
        return this;
    }
    static create<T extends typeof App>(this: T, config: AppConfig): T {
        this.boot(config);
        this.bootPlugin();
        return this;
    }
    static update<T extends typeof App>(this: T, config: AppConfig): T {
        this.config = config;
        return this;
    }
    static destroy<T extends typeof App>(this: T, config: AppConfig): T {
        this.config = config;
        return this;
    }
    static bulkUpdate<T extends typeof App>(this: T, config: AppConfig): T {
        this.updateConfig = config;
        return this;
    }
    static bulkDelete<T extends typeof App>(this: T, config: AppConfig): T {
        this.deleteConfig = config;
        return this;
    }
    static downloadPdf<T extends typeof App>(this: T, config: PdfConfig): T {
        this.pdfConfig = config;
        return this;
    }
    static downloadExcel<T extends typeof App>(this: T, config: ExcelConfig): T {
        this.excelConfig = config;
        return this;
    }
    static beforeSuccess<T extends typeof App>(this: T, callback: (op: AppConfig, res: unknown) => void): T {
        this.beforeSuccessHandler = callback;
        return this;
    }
    static success<T extends typeof App>(this: T, callback: (op: AppConfig, res: unknown) => void): T {
        this.successHandler = callback;
        return this;
    }
    static onSuccess<T extends typeof App>(this: T, callback: (op: AppConfig, res: unknown) => void): T {
        this.successHandler = callback;
        return this;
    }
    static afterSuccess<T extends typeof App>(this: T, callback: (op: AppConfig, res: unknown) => void): T {
        this.afterSuccessHandler = callback;
        return this;
    }
    static plugins<T extends typeof App>(this: T, config: AppConfig): T {
        this.config = config;
        this.bootPlugin();
        return this;
    }
    static legacy<T extends typeof App>(this: T, config: AppConfig, callback: Function): T {
        const { } = config;
        callback();
        return this;
    }
}
