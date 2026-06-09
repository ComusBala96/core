import { Lang } from '../app';
import { Ajax } from '../services/ajax';
import { Guard, Obj, Str, Sweet } from '../utils';
import { getSelectedTableData, getUpdatedTableData } from './plugins/datatable';
export function bulkUpdate(op = {}) {
    const { element = '', confirm = true, api, dataType = 'json', payload = {}, updateCols = false } = op;
    if (Guard.domElement(element)) {
        $(Str.getSelector(element))
            .off('click')
            .on('click', () => {
            let data = getUpdatedTableData(element, api, updateCols);
            data = Obj.mergePayload(data, payload);
            Ajax.post(Obj.merge(op, { payload: data, dataType, confirm }));
        });
    }
}
export function bulkDelete(op) {
    const { element = '', deleteConfirm = true, api, dataType = 'json', tableLoadType = 'ajax', payload = {} } = op;
    if (Guard.domElement(element)) {
        $(Str.getSelector(element))
            .off('click')
            .on('click', function () {
            const selected = api.rows('.selected').data().toArray();
            if (selected.length === 0) {
                Sweet.error({ html: `<span class="text-red-600 text-base">${Lang.errors.no_data_selected}</span>` });
                return;
            }
            let data = getSelectedTableData(element, selected, tableLoadType);
            data = Obj.mergePayload(data, payload);
            Ajax.post(Obj.merge(op, { payload: data, dataType, deleteConfirm }));
        });
    }
}
//# sourceMappingURL=crud.js.map