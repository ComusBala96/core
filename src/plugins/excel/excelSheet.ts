
import { getExcelBody } from '../../resources';
import { DownloadExcelOptions } from '../../types';

let xlsxLib: typeof import('xlsx') | null = null;


/* -----------------------------
   Lazy Load XLSX
----------------------------- */

async function loadXLSX(): Promise<typeof import('xlsx')> {
    if (xlsxLib) return xlsxLib;
    const XLSX = await import('xlsx');
    xlsxLib = XLSX;
    return XLSX;
}


/* -----------------------------
   Excel Generator
----------------------------- */

export async function makeExcel(op: DownloadExcelOptions = {}): Promise<void> {
    const XLSX = await loadXLSX();
    const { file_name = 'file_name', dataSrc = [], columns = [], pdf = [] } = op;

    /* filter export columns */

    op.filterColumn = columns.filter((_, index) => pdf.includes(index));
    const { payload = [], width = [] } = getExcelBody(dataSrc, op);
    if (!payload.length) return;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(payload);
    ws['!cols'] = width.map((w: any) => ({
        wch: typeof w === 'number' ? w : 20,
    }));
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${file_name}.xlsx`);
}
