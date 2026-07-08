import TomSelect from 'tom-select';
export function tomSelect(op) {
    if (typeof op === 'boolean') {
        op = {};
    }
    const { element = 'select', create = false, field = 'text', direction = 'asc', placeholder = 'Select an option' } = op;
    const elements = Array.isArray(element) ? element : [element];
    const placeholders = Array.isArray(placeholder) ? placeholder : Array(elements.length).fill(placeholder);
    if (typeof TomSelect !== 'function') {
        console.error('Select plugin not loaded');
        return;
    }
    elements.forEach((el, index) => {
        const selector = `.${el}`;
        if (!$(selector).length) {
            return;
        }
        new TomSelect(selector, {
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