import { bulkDelete, bulkUpdate } from '../resources';
import { downloadExcel, downloadPdf } from '../resources/download';
export class Crud {
    static create() { }
    static read() { }
    static update() { }
    static delete() { }
    static bulkUpdate(op) {
        bulkUpdate(op);
        return this;
    }
    static bulkDelete(op) {
        bulkDelete(op);
        return this;
    }
    static downloadPdf(op) {
        downloadPdf(op);
        return this;
    }
    static downloadExcel(op) {
        downloadExcel(op);
        return this;
    }
}
//# sourceMappingURL=crud.js.map