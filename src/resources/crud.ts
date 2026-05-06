import { Lang } from '../app';
import { Ajax } from '../services/ajax';
import { AppConfig, RowData } from '../types';
import { Guard, Obj, Sweet } from '../utils';
import { getSelectedTableData, getUpdatedTableData } from './plugins/datatable';

export function bulkUpdate(op: AppConfig = {}) {
    const { element = '', api, dataType = 'json', type = 'request', success = { alert: 'success' }, payload = {}, updateCols = false } = op;
    if (Guard.hasElement(element)) {
        $('#' + element)
            .off('click')
            .on('click', () => {
                let data = getUpdatedTableData(element, api, updateCols);
                data = Obj.mergePayload(data, payload);
                Ajax.put(Obj.merge(op, { payload: data, dataType, type, success }));
            });
    }
}

export function bulkDelete(op: AppConfig) {
    const { element = '', api, dataType = 'json', type = 'request', success = { alert: 'success' }, tableLoadType = 'ajax', payload = {} } = op;
    if (Guard.hasElement(element)) {
        $('#' + element)
            .off('click')
            .on('click', function () {
                const selected = api.rows('.selected').data().toArray() as RowData[];
                if (selected.length === 0) {
                    Sweet.error({ html: `<span class="text-red-600 text-base">${Lang.errors.no_data_selected}</span>` });
                    return;
                }
                let data = getSelectedTableData(element, selected, tableLoadType);
                data = Obj.mergePayload(data, payload);
                Ajax.delete(Obj.merge(op, { payload: data, dataType, type, success }));
            });
    }
}
