"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tomSelect = tomSelect;
const tslib_1 = require("tslib");
const tom_select_1 = tslib_1.__importDefault(require("tom-select"));
function tomSelect(op) {
    if (typeof op === 'boolean') {
        op = {};
    }
    const { element = 'select', create = false, field = 'text', direction = 'asc', placeholder = 'Select an option' } = op;
    const elements = Array.isArray(element) ? element : [element];
    const placeholders = Array.isArray(placeholder) ? placeholder : Array(elements.length).fill(placeholder);
    if (typeof tom_select_1.default !== 'function') {
        console.error('Select plugin not loaded');
        return;
    }
    elements.forEach((el, index) => {
        const selector = `.${el}`;
        if (!$(selector).length) {
            return;
        }
        new tom_select_1.default(selector, {
            create,
            sortField: [
                {
                    field,
                    direction,
                },
            ],
            placeholder: placeholders[index] ?? placeholders[0],
            plugins: {
                remove_button: {
                    title: 'Remove this item',
                },
                clear_button: {
                    title: 'Clear',
                },
                dropdown_input: {},
            },
        });
    });
}
//# sourceMappingURL=tom-select.js.map