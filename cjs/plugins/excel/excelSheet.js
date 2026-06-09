"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExcel = makeExcel;
const resources_1 = require("../../resources");
let xlsxLib = null;
/* -----------------------------
   Lazy Load XLSX
----------------------------- */
async function loadXLSX() {
    if (xlsxLib)
        return xlsxLib;
    const XLSX = await Promise.resolve().then(() => __importStar(require('xlsx')));
    xlsxLib = XLSX;
    return XLSX;
}
/* -----------------------------
   Excel Generator
----------------------------- */
async function makeExcel(op = {}) {
    const XLSX = await loadXLSX();
    const { file_name = 'file_name', dataSrc = [], columns = [], pdf = [] } = op;
    /* filter export columns */
    op.filterColumn = columns.filter((_, index) => pdf.includes(index));
    const { payload = [], width = [] } = (0, resources_1.getExcelBody)(dataSrc, op);
    if (!payload.length)
        return;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(payload);
    ws['!cols'] = width.map((w) => ({
        wch: typeof w === 'number' ? w : 20,
    }));
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${file_name}.xlsx`);
}
//# sourceMappingURL=excelSheet.js.map