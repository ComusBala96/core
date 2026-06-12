"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDataTable = loadDataTable;
exports.makeDataTable = makeDataTable;
const app_1 = require("../../app");
const utils_1 = require("../../utils");
const resources_1 = require("../../resources");
let dtLib = null;
/* -----------------------------
   Lazy load DataTables
----------------------------- */
async function initDataTables() {
    if (dtLib)
        return dtLib;
    const [DataTable] = await Promise.all([Promise.resolve().then(() => __importStar(require('datatables.net-dt'))), Promise.resolve().then(() => __importStar(require('datatables.net-responsive-dt')))]);
    dtLib = DataTable.default;
    return dtLib;
}
/* -----------------------------
   AJAX DataTable
----------------------------- */
async function loadDataTable(table, op = {}) {
    const DataTable = await initDataTables();
    const f = {
        glob: false,
        searching: true,
        ordering: false,
        paging: true,
        info: true,
        pageLength: app_1.Config.dt_size,
        responsive: true,
        lengthChange: true,
        stateSave: false,
        url: '',
        columns: [],
        payload: {},
        disabled: [],
        select: false,
        selected: [],
        processing: true,
        ...op,
    };
    const columnDefs = [];
    if (f.select) {
        columnDefs.push({
            orderable: false,
            targets: 0,
            render: (row) => (row?.select === false ? '' : '<input type="checkbox" class="dt-checkboxes">'),
        });
    }
    const postData = { _token: app_1.Config.csrf_token, lang: app_1.Config.locale, ...f.payload };
    if (DataTable.isDataTable(`#${table}`)) {
        $(`#${table}`).DataTable().destroy();
    }
    if (!$(`#${table}`).length)
        return;
    const dt = $(`#${table}`).DataTable({
        paging: f.paging,
        searching: f.searching,
        searchDelay: 500,
        serverSide: true,
        ordering: f.ordering,
        info: f.info,
        responsive: f.responsive,
        lengthChange: f.lengthChange,
        stateSave: f.stateSave,
        pageLength: f.pageLength,
        columnDefs,
        pagingType: 'simple_numbers',
        language: app_1.Lang.datatable,
        processing: f.processing,
        lengthMenu: [
            [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 500, 1000, 1500, 2000],
            [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 500, 1000, 1500, 2000],
        ],
        ajax: {
            type: 'POST',
            url: `${app_1.Config.app_url}${f.url}`,
            data: postData,
            dataSrc: (data) => {
                op = { ...op, data, dataSrc: data.data };
                if (app_1.Config.app_env)
                    console.log(data.data);
                return data?.data;
            },
            error: (err) => console.log(err),
        },
        columns: f.columns,
        order: [[1, 'desc']],
        drawCallback: function () {
            if (!$(`#${table} thead th:first-child input[type="checkbox"]`).length && f.select) {
                $(`#${table} thead th:first-child`).html('<input type="checkbox" class="dt-select-all">');
            }
            if (app_1.Config.locale === 'bn') {
                setTimeout(() => {
                    $('.dt-info').text(utils_1.Trans.number($('.dt-info').text()));
                    $('.dt-paging-button').each(function () {
                        const txt = $(this).text().trim();
                        if (/^\d+$/.test(txt))
                            $(this).html(String(utils_1.Trans.number(txt)));
                    });
                }, 10);
            }
            const api = this.api();
            if (typeof window[table] === 'function')
                window[table](table, api, op);
        },
    });
    (0, resources_1.selectAction)(table, dt, f);
}
async function makeDataTable(table, op = {}) {
    const DataTable = await initDataTables();
    const f = {
        glob: false,
        searching: true,
        ordering: false,
        paging: true,
        info: true,
        pageLength: app_1.Config.dt_size,
        responsive: true,
        lengthChange: true,
        stateSave: false,
        disabled: [],
        select: false,
        processing: true,
        ...op,
    };
    const columnDefs = [];
    if (f.select) {
        columnDefs.push({
            targets: 0,
            render: function (data) {
                if (typeof f.disabled !== 'undefined') {
                    return f.disabled.includes(Number(data)) ? '' : '<input type="checkbox" class="dt-checkboxes">';
                }
                else {
                    return '';
                }
            },
        });
    }
    if (DataTable.isDataTable(`#${table}`)) {
        $(`#${table}`).DataTable().destroy();
    }
    if (!$(`#${table}`).length)
        return;
    const dt = $(`#${table}`).DataTable({
        paging: f.paging,
        searching: f.searching,
        ordering: f.ordering,
        info: f.info,
        responsive: f.responsive,
        lengthChange: f.lengthChange,
        stateSave: f.stateSave,
        pageLength: f.pageLength,
        pagingType: 'simple_numbers',
        processing: f.processing,
        language: app_1.Lang.datatable,
        lengthMenu: [
            [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 500, 1000, 1500, 2000],
            [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 500, 1000, 1500, 2000],
        ],
        columnDefs,
        order: [[0, 'desc']],
        drawCallback: function () {
            if ($(`#${table} thead th:first-child input[type="checkbox"]`).length === 0) {
                $(`#${table} thead th:first-child`).html('<input type="checkbox" class="dt-select-all">');
            }
            if (app_1.Config.locale === 'bn') {
                setTimeout(() => {
                    $('.dt-info').text(utils_1.Trans.number($('.dt-info').text()));
                }, 10);
            }
            const api = this.api();
            const win = window;
            if (typeof win[table] === 'function') {
                win[table](table, api, f);
            }
        },
    });
    (0, resources_1.selectAction)(table, dt, f);
}
//# sourceMappingURL=datatable.js.map