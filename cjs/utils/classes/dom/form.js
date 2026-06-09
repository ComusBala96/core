"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
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
//# sourceMappingURL=form.js.map