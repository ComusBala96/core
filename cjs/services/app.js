"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const plugins_1 = require("../plugins");
const utils_1 = require("../utils");
const crud_1 = require("./crud");
const ajax_1 = require("./ajax");
const app_1 = require("../app");
class App {
    static bootPlugin(config) {
        if (utils_1.Guard.isPlugin(config?.plugins)) {
            if (config?.plugins?.select) {
                (0, plugins_1.tomSelect)(config?.plugins?.select);
            }
            if (config?.plugins?.jodit) {
                console.log(app_1.Config.locale);
                (0, plugins_1.jodit)(config?.plugins?.jodit);
            }
            if (config?.plugins?.datepicker) {
                (0, plugins_1.datepicker)(config?.plugins?.datepicker);
            }
            if (config?.plugins?.timepicker) {
                (0, plugins_1.timepicker)(config?.plugins?.timepicker);
            }
            if (config?.plugins?.datetimepicker) {
                (0, plugins_1.datetimepicker)(config?.plugins?.datetimepicker);
            }
            if (config?.plugins?.swiper) {
                (0, plugins_1.swiper)(config?.plugins?.swiper);
            }
        }
    }
    static bootTable(config) {
        const el = config?.element;
        if (typeof el !== 'string' || !el)
            return;
        window[el] = (_table, api, op) => {
            // PDF
            if (this.pdfConfig?.btn && utils_1.Guard.domElement(this.pdfConfig?.btn)) {
                crud_1.Crud.downloadPdf({ ...op, ...this.pdfConfig });
            }
            // Excel
            if (this.excelConfig?.btn && utils_1.Guard.domElement(this.excelConfig?.btn)) {
                crud_1.Crud.downloadExcel({ ...op, ...this.excelConfig });
            }
            // BULK Update
            if (this.bulkUpdateConfig?.element && utils_1.Guard.domElement(this.bulkUpdateConfig?.element)) {
                crud_1.Crud.bulkUpdate({ ...this.bulkUpdateConfig, api });
            }
            // BULK Delete
            if (this.bulkDeleteConfig?.element && utils_1.Guard.domElement(this.bulkDeleteConfig?.element)) {
                crud_1.Crud.bulkDelete({ ...this.bulkDeleteConfig, api });
            }
            if (api) {
                this.dataTableApi = api;
            }
        };
    }
    static table(config) {
        this.tableConfig = config;
        if (typeof this.tableConfig?.element === 'string' && this.tableConfig?.element !== '')
            if (utils_1.Guard.domElement(this.tableConfig?.element) && utils_1.Guard.isPlugin(this.tableConfig?.plugins) && this.tableConfig?.plugins?.dataTable) {
                (0, plugins_1.loadDataTable)(this.tableConfig?.element, this.tableConfig);
            }
        this.bootTable(this.tableConfig);
        this.bootPlugin(this.tableConfig);
        return this;
    }
    static submit(config) {
        try {
            this.config = config;
            if (typeof this.config?.element === 'string' && this.config?.element !== '')
                if (utils_1.Guard.domElement(this.config?.element) && utils_1.Guard.isObject(this.config) && !utils_1.Guard.isEmpty(this.config)) {
                    if (app_1.Config.app_env) {
                        console.log('App.submit method called with config:', this.config);
                    }
                    ajax_1.Ajax.post(this.config);
                }
        }
        catch (error) {
            throw new Error(`App.submit method failed: ${error.message}`);
        }
        return this;
    }
    static request(config) {
        this.config = config;
        ajax_1.Ajax.make(this.config);
        return this;
    }
    static create(config) {
        try {
            this.createConfig = config;
            if (typeof this.createConfig?.element === 'string' && this.createConfig?.element !== '')
                if (utils_1.Guard.domElement(this.createConfig?.element) && utils_1.Guard.isObject(this.createConfig) && !utils_1.Guard.isEmpty(this.config)) {
                    if (app_1.Config.app_env) {
                        console.log('App.create method called with config:', this.createConfig);
                    }
                    ajax_1.Ajax.post(this.createConfig);
                    this.bootPlugin(this.createConfig);
                }
        }
        catch (error) {
            throw new Error(`App.create method failed: ${error.message}`);
        }
        return this;
    }
    static update(config) {
        try {
            this.updateConfig = config;
            if (typeof this.updateConfig?.element === 'string' && this.updateConfig?.element !== '')
                if (utils_1.Guard.domElement(this.updateConfig?.element) && utils_1.Guard.isObject(this.updateConfig) && !utils_1.Guard.isEmpty(this.updateConfig)) {
                    if (app_1.Config.app_env) {
                        console.log('App.update method called with config:', this.updateConfig);
                    }
                    ajax_1.Ajax.post(this.updateConfig);
                    this.bootPlugin(this.updateConfig);
                }
        }
        catch (error) {
            throw new Error(`App.update method failed: ${error.message}`);
        }
        return this;
    }
    static destroy(config) {
        this.config = config;
        return this;
    }
    static bulkUpdate(config) {
        this.bulkUpdateConfig = config;
        return this;
    }
    static bulkDelete(config) {
        this.bulkDeleteConfig = config;
        return this;
    }
    static downloadPdf(config) {
        this.pdfConfig = config;
        return this;
    }
    static downloadExcel(config) {
        this.excelConfig = config;
        return this;
    }
    static beforeSuccess(callback) {
        this.beforeSuccessHandler = callback;
        return this;
    }
    static success(callback) {
        this.successHandler = callback;
        return this;
    }
    static onSuccess(callback) {
        this.successHandler = callback;
        return this;
    }
    static afterSuccess(callback) {
        this.afterSuccessHandler = callback;
        return this;
    }
    static plugins(config) {
        this.pluginConfig = config;
        this.bootPlugin(this.config);
        return this;
    }
    static event(event, element, callback) {
        utils_1.Dom.event(event, element, callback);
        return this;
    }
    static legacy(config, callback) {
        const {} = config;
        callback();
        return this;
    }
}
exports.App = App;
App.config = {};
App.pluginConfig = {};
App.tableConfig = {};
App.createConfig = {};
App.deleteConfig = {};
App.bulkDeleteConfig = {};
App.updateConfig = {};
App.bulkUpdateConfig = {};
App.pdfConfig = {};
App.excelConfig = {};
//# sourceMappingURL=app.js.map