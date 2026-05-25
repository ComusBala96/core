import TomSelect from 'tom-select';

export function tomSelect(op: Record<string, any> | boolean) {
    if (typeof op === 'boolean') {
        op = {};
    }
    const { element = 'select', create = false, field = 'text', direction = 'asc', placeholder = 'Select an option', } = op;
    const selector = `.${element}`;
    if (typeof TomSelect !== 'function') {
        console.error('Select plugin not loaded');
        return;
    }
    new TomSelect(selector, {
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
