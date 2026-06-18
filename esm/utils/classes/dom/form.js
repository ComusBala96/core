import { App } from '../../../services';
import { getFormData, resetForm } from '../../helpers';
export class Form {
    static getData(op) {
        return getFormData(op);
    }
    static reset(formId) {
        return resetForm(formId);
    }
}
Form.jodit = {
    reset() {
        if (App.editor) {
            App.editor.value = '';
            App.editor.setEditorValue('');
            App.editor.synchronizeValues();
            App.editor.events?.fire('change');
        }
    },
};
//# sourceMappingURL=form.js.map