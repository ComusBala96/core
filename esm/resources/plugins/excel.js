import { Str } from '../../utils';
export function getExcelBody(rows, op) {
    const { filterColumn } = op;
    const payload = [];
    const header = [];
    const width = [];
    /* ---------- headers + widths ---------- */
    if (typeof filterColumn !== 'undefined') {
        filterColumn.forEach((col) => {
            let colWidth = 20;
            if (col.excelWidth) {
                colWidth = col.excelWidth === 'auto' ? { auto: 1 } : col.excelWidth;
            }
            width.push(colWidth);
            header.push(col.title);
        });
    }
    payload.push(header);
    /* ---------- rows ---------- */
    rows.forEach((rowData) => {
        const row = [];
        filterColumn?.forEach((col) => {
            const value = Str.getExportValue(Str.getNestedValue(col.data, rowData));
            row.push(Str.escapeHtml(value ?? ''));
        });
        payload.push(row);
    });
    return { payload, width };
}
//# sourceMappingURL=excel.js.map