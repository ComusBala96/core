import { loadDataTable, tomSelect, jodit, datepicker, datetimepicker, timepicker, swiper } from '../plugins';
import { Dom, Guard } from '../utils';
import { Crud } from './crud';
import { Ajax } from './ajax';
import { Config } from '../app';
import { validate } from '../resources';
export class App {
    static bootPlugin(config) {
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
    static bootTable(config) {
        const el = config?.element;
        if (typeof el !== 'string' || !el)
            return;
        window[el] = (_table, api, op) => {
            // PDF
            if (this.pdfConfig?.btn && Guard.domElement(this.pdfConfig?.btn)) {
                Crud.downloadPdf({ ...op, ...this.pdfConfig });
            }
            // Excel
            if (this.excelConfig?.btn && Guard.domElement(this.excelConfig?.btn)) {
                Crud.downloadExcel({ ...op, ...this.excelConfig });
            }
            // BULK Update
            if (this.bulkUpdateConfig?.element && Guard.domElement(this.bulkUpdateConfig?.element)) {
                Crud.bulkUpdate({ ...this.bulkUpdateConfig, api });
            }
            // BULK Delete
            if (this.bulkDeleteConfig?.element && Guard.domElement(this.bulkDeleteConfig?.element)) {
                Crud.bulkDelete({ ...this.bulkDeleteConfig, api });
            }
            if (api) {
                this.dataTableApi = api;
            }
        };
    }
    static table(config) {
        this.tableConfig = config;
        if (typeof this.tableConfig?.element === 'string' && this.tableConfig?.element !== '')
            if (Guard.domElement(this.tableConfig?.element) && Guard.isPlugin(this.tableConfig?.plugins) && this.tableConfig?.plugins?.dataTable) {
                loadDataTable(this.tableConfig?.element, this.tableConfig);
            }
        this.bootTable(this.tableConfig);
        this.bootPlugin(this.tableConfig);
        return this;
    }
    static submit(config) {
        try {
            this.config = config;
            if (typeof this.config?.element === 'string' && this.config?.element !== '')
                if (Guard.domElement(this.config?.element) && Guard.isObject(this.config) && !Guard.isEmpty(this.config)) {
                    if (Config.app_env) {
                        console.log('App.submit method called with config:', this.config);
                    }
                    Ajax.post(this.config);
                }
        }
        catch (error) {
            throw new Error(`App.submit method failed: ${error.message}`);
        }
        return this;
    }
    static request(config) {
        this.config = config;
        Ajax.make(this.config);
        return this;
    }
    static create(config) {
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
                if (Guard.domElement(this.updateConfig?.element) && Guard.isObject(this.updateConfig) && !Guard.isEmpty(this.updateConfig)) {
                    if (Config.app_env) {
                        console.log('App.update method called with config:', this.updateConfig);
                    }
                    this.bootPlugin(this.updateConfig);
                    Ajax.post(this.updateConfig);
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
        Dom.event(event, element, callback);
        return this;
    }
    static refreshValidation(rules) {
        if (!this.createConfig?.element) {
            return;
        }
        if (rules) {
            this.createConfig.rules = rules;
        }
        if (this.validator && typeof this.validator.destroy === 'function') {
            this.validator.destroy();
        }
        this.validator = validate(this.createConfig, this.successHandler);
    }
    static addValidationRules(name, rules) {
        if (!this.validator) {
            return;
        }
        const $field = $(`[name="${name}"]`);
        if ($field.length) {
            // @ts-ignore
            $field.rules('add', rules);
        }
    }
    static legacy(config, callback) {
        const {} = config;
        callback();
        return this;
    }
}
App.editors = {};
App.validator = null;
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