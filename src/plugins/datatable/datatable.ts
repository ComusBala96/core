import type { Api } from 'datatables.net';
import { DataTableOptions } from '../../types';
import { Config, Lang } from '../../app';
import { Trans } from '../../utils';
import { selectAction } from '../../resources';

let dtLib: any = null;

/* -----------------------------
   Lazy load DataTables
----------------------------- */
async function initDataTables() {
    if (dtLib) return dtLib;
    const [DataTable] = await Promise.all([import('datatables.net-dt'), import('datatables.net-responsive-dt')]);
    dtLib = DataTable.default;
    return dtLib;
}

/* -----------------------------
   AJAX DataTable
----------------------------- */
export async function loadDataTable(table: string, op: DataTableOptions = {}) {
    const DataTable = await initDataTables();

    const f: DataTableOptions = {
        glob: false,
        searching: true,
        ordering: false,
        paging: true,
        info: true,
        pageLength: Config.dt_size,
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

    const columnDefs: any[] = [];

    if (f.select) {
        columnDefs.push({
            orderable: false,
            targets: 0,
            render: (row: any) => (row?.select === false ? '' : '<input type="checkbox" class="dt-checkboxes">'),
        });
    }

    const postData = { _token: Config.csrf_token, lang: Config.locale, ...f.payload };

    if (DataTable.isDataTable(`#${table}`)) {
        $(`#${table}`).DataTable().destroy();
    }

    if (!$(`#${table}`).length) return;

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
        language: Lang.datatable,
        processing: f.processing,
        lengthMenu: [
            [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 500, 1000, 1500, 2000],
            [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 500, 1000, 1500, 2000],
        ],
        ajax: {
            type: 'POST',
            url: `${Config.app_url}${f.url}`,
            data: postData,
            dataSrc: (data: Record<string, any>) => {
                op = { ...op, data, dataSrc: data.data };
                if (Config.app_env) console.log(data.data);
                return data.data;
            },
            error: (err: unknown) => console.log(err),
        },
        columns: f.columns,
        order: [[1, 'desc']],
        drawCallback: function () {
            if (!$(`#${table} thead th:first-child input[type="checkbox"]`).length && f.select) {
                $(`#${table} thead th:first-child`).html('<input type="checkbox" class="dt-select-all">');
            }
            if (Config.locale === 'bn') {
                setTimeout(() => {
                    $('.dt-info').text(Trans.number($('.dt-info').text()));
                    $('.dt-paging-button').each(function (this: HTMLElement): void {
                        const txt: number | string = $(this).text().trim();
                        if (/^\d+$/.test(txt)) $(this).html(String(Trans.number(txt)));
                    });
                }, 10);
            }
            const api = this.api();
            if (typeof (window as any)[table] === 'function') (window as any)[table](table, api, op);
        },
    });

    selectAction(table, dt, f);
}
export async function makeDataTable(table: string, op: DataTableOptions = {}) {
    const DataTable = await initDataTables();

    const f: DataTableOptions = {
        glob: false,
        searching: true,
        ordering: false,
        paging: true,
        info: true,
        pageLength: Config.dt_size,
        responsive: true,
        lengthChange: true,
        stateSave: false,
        disabled: [],
        select: false,
        processing: true,
        ...op,
    };

    const columnDefs: any[] = [];

    if (f.select) {
        columnDefs.push({
            targets: 0,
            render: function (data: any) {
                if (typeof f.disabled !== 'undefined') {
                    return f.disabled.includes(Number(data)) ? '' : '<input type="checkbox" class="dt-checkboxes">';
                } else {
                    return '';
                }
            },
        });
    }

    if (DataTable.isDataTable(`#${table}`)) {
        $(`#${table}`).DataTable().destroy();
    }

    if (!$(`#${table}`).length) return;

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
        language: Lang.datatable,
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

            if (Config.locale === 'bn') {
                setTimeout(() => {
                    $('.dt-info').text(Trans.number($('.dt-info').text()));
                }, 10);
            }

            const api: Api = this.api();
            const win = window as unknown as Record<string, any>;
            if (typeof win[table] === 'function') {
                win[table](table, api, f);
            }
        },
    });

    selectAction(table, dt, f);
}



