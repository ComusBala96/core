import { Api } from 'datatables.net-dt';
import { loadDataTable, tomSelect, jodit, datepicker, datetimepicker, timepicker, swiper } from '../plugins';
import { AppConfig, DataTableOptions, DownloadExcelOptions, ExcelConfig, PdfConfig } from '../types';
import { Dom, Guard } from '../utils';
import { Crud } from './crud';
import { Ajax } from './ajax';
import { Config } from '../app';

export class App {
    static config: AppConfig = {};
    static tableConfig: AppConfig = {};
    static createConfig: AppConfig = {};
    static deleteConfig: AppConfig = {};
    static updateConfig: AppConfig = {};
    static pdfConfig: PdfConfig = {};
    static excelConfig: ExcelConfig = {};
    static beforeSuccessHandler?: undefined | ((op: AppConfig, res: Record<string, any>) => void);
    static successHandler?: undefined | ((op: AppConfig, res: Record<string, any>) => void);
    static afterSuccessHandler?: undefined | ((op: AppConfig, res: Record<string, any>) => void);
    protected static bootPlugin(config: AppConfig): void {
        if (Guard.isPlugin(config?.plugins)) {
            if (config?.plugins?.select) {
                tomSelect(config?.plugins?.select);
            }
            if (config?.plugins?.jodit) {
                jodit(config?.plugins?.jodit);
            }
            if (config?.plugins?.datepicker) {
                datepicker(config?.plugins?.datepicker);
            }
            if (config?.plugins?.timepicker) {
                timepicker(config?.plugins?.timepicker);
            }
            if (config?.plugins?.datetimepicker) {
                datetimepicker(config?.plugins?.datetimepicker);
            }
            if (config?.plugins?.swiper) {
                swiper(config?.plugins?.swiper);
            }
        }
    }
    protected static bootTable(config: AppConfig): void {
        const el = config?.element;
        if (typeof el !== 'string' || !el) return;
        (window as any)[el] = (_table: string, api: Api<any>, op: DataTableOptions) => {
            // PDF
            if (this.pdfConfig?.btn && Guard.domElement(this.pdfConfig?.btn)) {
                Crud.downloadPdf({ ...op, ...this.pdfConfig } as DataTableOptions);
            }
            // Excel
            if (this.excelConfig?.btn && Guard.domElement(this.excelConfig?.btn)) {
                Crud.downloadExcel({ ...op, ...this.excelConfig } as DownloadExcelOptions);
            }
            // BULK Update
            if (this.updateConfig?.element && Guard.domElement(this.updateConfig?.element)) {
                Crud.bulkUpdate({ ...this.updateConfig, api });
            }
            // BULK Delete
            if (this.deleteConfig?.element && Guard.domElement(this.deleteConfig?.element)) {
                Crud.bulkDelete({ ...this.deleteConfig, api });
            }
        };
    }
    static table<T extends typeof App>(this: T, config: AppConfig): T {
        this.tableConfig = config;
        if (typeof this.tableConfig?.element === 'string' && this.tableConfig?.element !== '')
            if (Guard.domElement(this.tableConfig?.element) && Guard.isPlugin(this.tableConfig?.plugins) && this.tableConfig?.plugins?.dataTable) {
                loadDataTable(this.tableConfig?.element, this.tableConfig);
            }
        this.bootTable(this.tableConfig);
        this.bootPlugin(this.tableConfig);
        return this;
    }
    static submit<T extends typeof App>(this: T, config: AppConfig): T {
        try {
            this.config = config;
            if (typeof this.config?.element === 'string' && this.config?.element !== '')
                if (Guard.domElement(this.config?.element) && Guard.isObject(this.config) && !Guard.isEmpty(this.config)) {
                    if (Config.app_env) {
                        console.log('App.submit method called with config:', this.config);
                    }
                    Ajax.post(this.config);
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
        try {
            this.createConfig = config;
            if (typeof this.createConfig?.element === 'string' && this.createConfig?.element !== '')
                if (Guard.domElement(this.createConfig?.element) && Guard.isObject(this.createConfig) && !Guard.isEmpty(this.config)) {
                    if (Config.app_env) {
                        console.log('App.create method called with config:', this.createConfig);
                    }
                    Ajax.post(this.createConfig);
                    this.bootPlugin(this.createConfig);
                }
        } catch (error) {
            throw new Error(`App.create method failed: ${(error as Error).message}`);
        }
        return this;
    }
    static update<T extends typeof App>(this: T, config: AppConfig): T {
        try {
            this.updateConfig = config;
            if (typeof this.updateConfig?.element === 'string' && this.updateConfig?.element !== '')
                if (Guard.domElement(this.updateConfig?.element) && Guard.isObject(this.updateConfig) && !Guard.isEmpty(this.updateConfig)) {
                    if (Config.app_env) {
                        console.log('App.update method called with config:', this.updateConfig);
                    }
                    Ajax.post(this.updateConfig);
                    this.bootPlugin(this.updateConfig);
                }
        } catch (error) {
            throw new Error(`App.update method failed: ${(error as Error).message}`);
        }
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
        this.bootPlugin(this.config);
        return this;
    }
    static event<T extends typeof App>(this: T, event: string, element: string, callback: (e: JQuery.TriggeredEvent, element: HTMLElement) => void): T {
        Dom.event(event, element, callback);
        return this;
    }
    static legacy<T extends typeof App>(this: T, config: AppConfig, callback: Function): T {
        const { } = config;
        callback();
        return this;
    }
}
