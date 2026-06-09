"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectAction = selectAction;
exports.showSelected = showSelected;
exports.getUpdatedTableData = getUpdatedTableData;
exports.getSelectedTableData = getSelectedTableData;
const app_1 = require("../../app");
const utils_1 = require("../../utils");
/* -----------------------------
   Row Select Logic
----------------------------- */
function selectAction(table, dt, op) {
    const $table = $(`#${table}`);
    $table.find('tbody').on('click', 'input[type="checkbox"]', function (e) {
        const $row = $(this).closest('tr');
        this.checked ? $row.addClass('selected') : $row.removeClass('selected');
        showSelected(dt, op);
        e.stopPropagation();
    });
    $table.find('thead th:first-child').on('click', 'input[type="checkbox"]', function (e) {
        const cb = $table.find('tbody input[type="checkbox"]');
        this.checked ? cb.prop('checked', true).closest('tr').addClass('selected') : cb.prop('checked', false).closest('tr').removeClass('selected');
        showSelected(dt, op);
        e.stopPropagation();
    });
}
/* -----------------------------
   Show Selected Rows
----------------------------- */
function showSelected(dt, op = {}) {
    const count = dt.rows('.selected').data().length;
    if (count === 0) {
        $('#show_selected').html('');
        $('#show_selected_base').addClass('hidden');
    }
    else {
        const dtLang = dt.settings()[0].oLanguage;
        const text = dtLang.select.aria.rowCheckbox.replace('_COUNT_', count);
        $('#show_selected_base').removeClass('hidden');
        $('#show_selected').html(app_1.Config.locale === 'bn' ? utils_1.Trans.number(text) : text);
    }
    if (op.onSelectRows)
        op.onSelectRows(dt, op);
}
/* -----------------------------
   Get Column Data
----------------------------- */
function getValueByName(cell, name) {
    const el = cell.querySelector(`[data-name="${name}"]`);
    if (!el)
        return null;
    if (el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
        return el.value;
    }
    return el.textContent?.trim() ?? null;
}
function getNamesFromColumn(api, colIndex) {
    const cell = api.cell(0, colIndex).node();
    const elements = cell.querySelectorAll('[data-name]');
    return Array.from(elements)
        .map((el) => el.getAttribute('data-name') || '')
        .filter(Boolean);
}
function resolveConfig(api, updateCols) {
    const base = app_1.Config.dt_update_cols;
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
        const items = [base.items[0]];
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
    const merged = {
        ...base,
        ...updateCols,
        items: updateCols.items ?? base.items,
    };
    if (!merged.items.some((i) => i.name === merged.key)) {
        merged.items.unshift(base.items[0]);
    }
    return merged;
}
function getUpdatedTableData(element, api, updateCols) {
    const data = {};
    if (!api)
        return utils_1.Obj.getDataAttr(element);
    const config = resolveConfig(api, updateCols);
    const keyCol = config.items.find((i) => i.name === config.key);
    const ids = [];
    api.rows().every(function () {
        const cell = api.cell(this.index(), keyCol.index).node();
        ids.push(getValueByName(cell, keyCol.name));
    });
    data[config.key] = {};
    ids.forEach((id, i) => {
        if (id !== null && id !== '') {
            data[config.key][String(i + 1)] = id;
        }
    });
    for (const col of config.items) {
        if (col.name === config.key)
            continue;
        const mapped = {};
        api.rows().every(function () {
            const i = this.index();
            const cell = api.cell(i, col.index).node();
            const key = ids[i];
            const value = getValueByName(cell, col.name);
            if (key !== null && key !== '') {
                mapped[String(key)] = value;
            }
        });
        data[col.name] = mapped;
    }
    return {
        ...utils_1.Obj.getDataAttr(element),
        ...data,
    };
}
function getSelectedTableData(element, selected, tableLoadType = 'ajax') {
    const ids = selected
        .map((row) => {
        if (tableLoadType === 'ajax') {
            return row?.id;
        }
        return Array.isArray(row) ? row[0] : null;
    })
        .filter((id) => id !== null && id !== undefined);
    return {
        ...utils_1.Obj.getDataAttr(element),
        ids,
    };
}
//# sourceMappingURL=datatable.js.map