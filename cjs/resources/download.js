"use strict";
/* ---------------------------
   Bind Button
----------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadPdf = downloadPdf;
exports.downloadExcel = downloadExcel;
const plugins_1 = require("../plugins");
const utils_1 = require("../utils");
function downloadPdf(op) {
    try {
        const btn = op?.btn;
        if (typeof btn !== 'string' || btn.trim() === '') {
            throw new Error('Invalid "btn". Expected non-empty string');
        }
        const $el = $(utils_1.Str.getSelector(btn)); // allow any selector
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
                    extra = utils_1.Obj.jsonParse(attr);
                }
                catch {
                    throw new Error(`Invalid JSON in data-pdf-op: ${attr}`);
                }
                const options = { ...op, ...extra };
                await (0, plugins_1.MakePdf)(options);
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
function downloadExcel(op = {}) {
    const { btn = 'excelDownload' } = op;
    const $btn = $(utils_1.Str.getSelector(btn));
    $btn.off('click');
    $btn.on('click', async function () {
        const dataset = $(this).attr('data-excel-op');
        const parsed = dataset ? utils_1.Obj.jsonParse(dataset) : {};
        const newOp = utils_1.Obj.merge(op, parsed);
        const { globLoader = true } = newOp;
        if (globLoader) {
            utils_1.Loader.show('theDownloadLoader');
        }
        try {
            await (0, plugins_1.makeExcel)(newOp).then(() => {
                if (globLoader) {
                    utils_1.Loader.hide('theDownloadLoader');
                }
            });
        }
        catch (e) {
            console.log('Excel generation:', e);
            if (globLoader) {
                utils_1.Loader.hide('theDownloadLoader');
            }
        }
    });
}
//# sourceMappingURL=download.js.map