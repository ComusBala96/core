import { getFormData, resetForm } from "../../helpers";
export class Form {
    static getData(op) {
        return getFormData(op);
    }
    static reset(formId) {
        return resetForm(formId);
    }
}
//# sourceMappingURL=form.js.map