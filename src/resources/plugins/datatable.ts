import { Api } from 'datatables.net';
import { DataTableOptions, DtValue, RowData, UpdateColItem, UpdateCols, UpdateColsOption } from '../../types';
import { Config } from '../../app';
import { Obj, Trans } from '../../utils';

/* -----------------------------
   Row Select Logic
----------------------------- */
export function selectAction(table: string, dt: Api, op: DataTableOptions) {
    const $table = $(`#${table}`);
    $table.find('tbody').on('click', 'input[type="checkbox"]', function (this: any, e: JQuery.ClickEvent<HTMLElement>) {
        const $row = $(this).closest('tr');
        this.checked ? $row.addClass('selected') : $row.removeClass('selected');
        showSelected(dt, op);
        e.stopPropagation();
    });

    $table.find('thead th:first-child').on('click', 'input[type="checkbox"]', function (this: any, e: JQuery.ClickEvent<HTMLElement>) {
        const cb = $table.find('tbody input[type="checkbox"]');
        this.checked ? cb.prop('checked', true).closest('tr').addClass('selected') : cb.prop('checked', false).closest('tr').removeClass('selected');
        showSelected(dt, op);
        e.stopPropagation();
    });
}

/* -----------------------------
   Show Selected Rows
----------------------------- */
export function showSelected(dt: Api, op: DataTableOptions = {}) {
    const count = dt.rows('.selected').data().length;
    if (count === 0) {
        $('#show_selected').html('');
        $('#show_selected_base').addClass('hidden');
    } else {
        const dtLang = dt.settings()[0].oLanguage;
        const text = dtLang.select.aria.rowCheckbox.replace('_COUNT_', count);
        $('#show_selected_base').removeClass('hidden');
        $('#show_selected').html(Config.locale === 'bn' ? Trans.number(text) : text);
    }
    if (op.onSelectRows) op.onSelectRows(dt, op);
}

/* -----------------------------
   Get Column Data
----------------------------- */
function getValueByName(cell: HTMLElement, name: string): DtValue {
    const el = cell.querySelector(`[data-name="${name}"]`) as HTMLElement | null;
    if (!el) return null;
    if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
        return el.value;
    }
    return el.textContent?.trim() ?? null;
}
function getNamesFromColumn(api: Api, colIndex: number): string[] {
    const cell = api.cell(0, colIndex).node() as HTMLElement;

    const elements = cell.querySelectorAll('[data-name]');

    return Array.from(elements)
        .map((el) => el.getAttribute('data-name') || '')
        .filter(Boolean);
}
function resolveConfig(api: Api, updateCols?: UpdateColsOption): UpdateCols {
    const base = Config.dt_update_cols;
    if (!updateCols) {
        return {
            key: base.key,
            items: [base.items[0]],
        };
    }
    if (updateCols === true) {
        return base;
    }
    if (Array.isArray(updateCols)) {
        const items: UpdateColItem[] = [base.items[0]];
        updateCols.forEach((index) => {
            const names = getNamesFromColumn(api, index);

            names.forEach((name) => {
                if (!items.find((i) => i.name === name)) {
                    items.push({ index, name });
                }
            });
        });
        return {
            key: base.key,
            items,
        };
    }
    const merged: UpdateCols = {
        ...base,
        ...updateCols,
        items: updateCols.items ?? base.items,
    };
    if (!merged.items.some((i) => i.name === merged.key)) {
        merged.items.unshift(base.items[0]);
    }
    return merged;
}
export function getUpdatedTableData(element: string, api: Api, updateCols?: UpdateColsOption): Record<string, Record<string, DtValue>> {
    const data: Record<string, Record<string, DtValue>> = {};
    if (!api) return Obj.getDataAttr(element) as Record<string, any>;
    const config = resolveConfig(api, updateCols);
    const keyCol = config.items.find((i) => i.name === config.key)!;
    const ids: DtValue[] = [];
    api.rows().every(function () {
        const cell = api.cell(this.index(), keyCol.index).node() as HTMLElement;
        ids.push(getValueByName(cell, keyCol.name));
    });
    data[config.key] = {};
    ids.forEach((id, i) => {
        if (id !== null && id !== '') {
            data[config.key][String(i + 1)] = id;
        }
    });
    for (const col of config.items) {
        if (col.name === config.key) continue;
        const mapped: Record<string, DtValue> = {};
        api.rows().every(function () {
            const i = this.index();
            const cell = api.cell(i, col.index).node() as HTMLElement;

            const key = ids[i];
            const value = getValueByName(cell, col.name);

            if (key !== null && key !== '') {
                mapped[String(key)] = value;
            }
        });
        data[col.name] = mapped;
    }

    return {
        ...(Obj.getDataAttr(element) as Record<string, any>),
        ...data,
    };
}
export function getSelectedTableData(element: string, selected: RowData[], tableLoadType: 'ajax' | 'dom' = 'ajax'): Record<string, any> {
    const ids: (number | string)[] = selected
        .map((row) => {
            if (tableLoadType === 'ajax') {
                return (row as Record<string, any>)?.id;
            }
            return Array.isArray(row) ? row[0] : null;
        })
        .filter((id): id is number | string => id !== null && id !== undefined);
    return {
        ...Obj.getDataAttr(element),
        ids,
    };
}
