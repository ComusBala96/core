/* ---------------------------
   Bind Button
----------------------------*/

import { makeExcel, MakePdf } from '../plugins';
import { DownloadExcelOptions, MakePdfOptions } from '../types';

export function downloadPdf(op: MakePdfOptions) {
    try {
        const btn = op?.btn;
        if (typeof btn !== 'string' || btn.trim() === '') {
            throw new Error('Invalid "btn". Expected non-empty string');
        }
        const $el = $('#' + btn); // allow any selector
        if ($el.length === 0) {
            throw new Error(`Element not found for selector: ${btn}`);
        }
        $el.off('click') // namespaced
            .on('click', async function () {
                try {
                    const attr = $(this).attr('data-pdf-op');
                    if (!attr) {
                        throw new Error(`Missing data-pdf-op on ${btn}`);
                    }
                    let extra: Record<string, any> = {};
                    try {
                        extra = JSON.parse(attr);
                    } catch {
                        throw new Error(`Invalid JSON in data-pdf-op: ${attr}`);
                    }
                    const options = { ...op, ...extra };
                    await MakePdf(options);
                } catch (err) {
                    console.error('PDF Click Handler', err);
                }
            });
    } catch (e) {
        console.error('PDF Initialization', e);
    }
}

/* -----------------------------
   Excel Button Handler
----------------------------- */

export function downloadExcel(op: DownloadExcelOptions = {}): void {
    const btn = op.btn ?? 'excelDownload';
    const $btn = $('#' + btn);
    $btn.off('click');
    $btn.on('click', async function (this: HTMLElement) {
        const dataset = $(this).attr('data-excel-op');
        const parsed = dataset ? JSON.parse(dataset) : {};
        const newOp: DownloadExcelOptions = {
            ...op,
            ...parsed,
        };
        await makeExcel(newOp);
    });
}
