"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
const services_1 = require("../../../services");
const helpers_1 = require("../../helpers");
class Form {
    static getData(op) {
        return (0, helpers_1.getFormData)(op);
    }
    static reset(formId) {
        return (0, helpers_1.resetForm)(formId);
    }
}
exports.Form = Form;
Form.jodit = {
    reset() {
        if (services_1.App.editor) {
            services_1.App.editor.value = '';
            services_1.App.editor.setEditorValue('');
            services_1.App.editor.synchronizeValues();
            services_1.App.editor.events?.fire('change');
        }
    },
};
//# sourceMappingURL=form.js.map