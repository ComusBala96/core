import { App } from '../../../services';
import { AppConfig } from '../../../types';
import { getFormData, resetForm } from '../../helpers';

export class Form {
    static getData(op: AppConfig): FormData | Record<string, any> {
        return getFormData(op);
    }
    static reset(formId: string) {
        return resetForm(formId);
    }
    static jodit = {
        reset() {
            if (App.editor) {
                App.editor.value = '';
                App.editor.synchronizeValues();
                App.editor.events?.fire('change');
            }
        },
    };
}
