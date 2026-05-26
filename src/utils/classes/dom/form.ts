import { AppConfig } from "../../../types";
import { getFormData, resetForm } from "../../helpers";

export class Form {
    static getData(op: AppConfig): FormData | Record<string, any> {
        return getFormData(op);
    }
    static reset(formId: string) {
        return resetForm(formId);
    }
}