import { getExcelBody } from '../../resources';
let xlsxLib = null;
/* -----------------------------
   Lazy Load XLSX
----------------------------- */
async function loadXLSX() {
    if (xlsxLib)
        return xlsxLib;
    const XLSX = await import('xlsx');
    xlsxLib = XLSX;
    return XLSX;
}
/* -----------------------------
   Excel Generator
----------------------------- */
export async function makeExcel(op = {}) {
    const XLSX = await loadXLSX();
    const { file_name = 'file_name', dataSrc = [], columns = [], pdf = [] } = op;
    /* filter export columns */
    op.filterColumn = columns.filter((_, index) => pdf.includes(index));
    const { payload = [], width = [] } = getExcelBody(dataSrc, op);
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