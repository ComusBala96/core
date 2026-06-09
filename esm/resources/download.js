/* ---------------------------
   Bind Button
----------------------------*/
import { makeExcel, MakePdf } from '../plugins';
import { Loader, Obj, Str } from '../utils';
export function downloadPdf(op) {
    try {
        const btn = op?.btn;
        if (typeof btn !== 'string' || btn.trim() === '') {
            throw new Error('Invalid "btn". Expected non-empty string');
        }
        const $el = $(Str.getSelector(btn)); // allow any selector
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
                let extra = {};
                try {
                    extra = Obj.jsonParse(attr);
                }
                catch {
                    throw new Error(`Invalid JSON in data-pdf-op: ${attr}`);
                }
                const options = { ...op, ...extra };
                await MakePdf(options);
            }
            catch (err) {
                console.error('PDF Click Handler', err);
            }
        });
    }
    catch (e) {
        console.error('PDF Initialization', e);
    }
}
/* -----------------------------
   Excel Button Handler
----------------------------- */
export function downloadExcel(op = {}) {
    const { btn = 'excelDownload' } = op;
    const $btn = $(Str.getSelector(btn));
    $btn.off('click');
    $btn.on('click', async function () {
        const dataset = $(this).attr('data-excel-op');
        const parsed = dataset ? Obj.jsonParse(dataset) : {};
        const newOp = Obj.merge(op, parsed);
        const { globLoader = true } = newOp;
        if (globLoader) {
            Loader.show('theDownloadLoader');
        }
        try {
            await makeExcel(newOp).then(() => {
                if (globLoader) {
                    Loader.hide('theDownloadLoader');
                }
            });
        }
        catch (e) {
            console.log('Excel generation:', e);
            if (globLoader) {
                Loader.hide('theDownloadLoader');
            }
        }
    });
}
//# sourceMappingURL=download.js.map