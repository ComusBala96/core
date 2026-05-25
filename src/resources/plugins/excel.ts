import { ExcelOptions, ExcelResult, ExcelWidth } from "../../types";
import { Str } from "../../utils";


export function getExcelBody(rows: Record<string, any>[], op: ExcelOptions): ExcelResult {
    const { filterColumn } = op;
    const payload: (string | number)[][] = [];
    const header: string[] = [];
    const width: ExcelWidth[] = [];
    /* ---------- headers + widths ---------- */
    if (typeof filterColumn !== 'undefined') {
        filterColumn.forEach((col) => {
            let colWidth: ExcelWidth = 20;
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
        const row: (string | number)[] = [];
        if (typeof filterColumn !== 'undefined') {
            filterColumn.forEach((col) => {
                let access = col.data;
                if (col.renderData) {
                    access = col.renderData.data;
                    const type = col.renderData.type ?? 'text';
                    if (type === 'image') {
                        // Excel image handling (optional future feature)
                        // row.push({ image: escapeHtml(getNestedValue(access, rowData)) });

                        row.push('');
                    } else {
                        row.push(Str.escapeHtml(Str.getNestedValue(access, rowData)));
                    }
                } else {
                    row.push(Str.escapeHtml(Str.getNestedValue(access, rowData)));
                }
            });
        }
        payload.push(row);
    });

    return { payload, width };
}