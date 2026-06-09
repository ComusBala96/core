"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tomSelect = tomSelect;
const tslib_1 = require("tslib");
const tom_select_1 = tslib_1.__importDefault(require("tom-select"));
function tomSelect(op) {
    if (typeof op === 'boolean') {
        op = {};
    }
    const { element = 'select', create = false, field = 'text', direction = 'asc', placeholder = 'Select an option', } = op;
    const selector = `.${element}`;
    if (typeof tom_select_1.default !== 'function') {
        console.error('Select plugin not loaded');
        return;
    }
    if ($(selector).length > 0) {
        new tom_select_1.default(selector, {
            create: create,
            sortField: [
                {
                    field: field,
                    direction: direction,
                },
            ],
            placeholder: placeholder,
            plugins: {
                remove_button: {
                    title: 'Remove this item'
                },
                clear_button: {
                    title: 'Clear'
                },
                dropdown_input: {}
            },
        });
    }
}
//# sourceMappingURL=tom-select.js.map