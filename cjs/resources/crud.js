"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkUpdate = bulkUpdate;
exports.bulkDelete = bulkDelete;
const app_1 = require("../app");
const ajax_1 = require("../services/ajax");
const utils_1 = require("../utils");
const datatable_1 = require("./plugins/datatable");
function bulkUpdate(op = {}) {
    const { element = '', confirm = true, api, dataType = 'json', payload = {}, updateCols = false } = op;
    if (utils_1.Guard.domElement(element)) {
        $(utils_1.Str.getSelector(element))
            .off('click')
            .on('click', () => {
            let data = (0, datatable_1.getUpdatedTableData)(element, api, updateCols);
            data = utils_1.Obj.mergePayload(data, payload);
            ajax_1.Ajax.post(utils_1.Obj.merge(op, { payload: data, dataType, confirm }));
        });
    }
}
function bulkDelete(op) {
    const { element = '', deleteConfirm = true, api, dataType = 'json', tableLoadType = 'ajax', payload = {} } = op;
    if (utils_1.Guard.domElement(element)) {
        $(utils_1.Str.getSelector(element))
            .off('click')
            .on('click', function () {
            const selected = api.rows('.selected').data().toArray();
            if (selected.length === 0) {
                utils_1.Sweet.error({ html: `<span class="text-red-600 text-base">${app_1.Lang.errors.no_data_selected}</span>` });
                return;
            }
            let data = (0, datatable_1.getSelectedTableData)(element, selected, tableLoadType);
            data = utils_1.Obj.mergePayload(data, payload);
            ajax_1.Ajax.post(utils_1.Obj.merge(op, { payload: data, dataType, deleteConfirm }));
        });
    }
}
//# sourceMappingURL=crud.js.map