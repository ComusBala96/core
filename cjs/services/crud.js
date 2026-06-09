"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crud = void 0;
const resources_1 = require("../resources");
const download_1 = require("../resources/download");
class Crud {
    static create() { }
    static read() { }
    static update() { }
    static delete() { }
    static bulkUpdate(op) {
        (0, resources_1.bulkUpdate)(op);
        return this;
    }
    static bulkDelete(op) {
        (0, resources_1.bulkDelete)(op);
        return this;
    }
    static downloadPdf(op) {
        (0, download_1.downloadPdf)(op);
        return this;
    }
    static downloadExcel(op) {
        (0, download_1.downloadExcel)(op);
        return this;
    }
}
exports.Crud = Crud;
//# sourceMappingURL=crud.js.map