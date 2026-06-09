"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakePdf = MakePdf;
exports.getPdfMake = getPdfMake;
const tslib_1 = require("tslib");
const http_1 = require("../../http");
const vfs_fonts_1 = tslib_1.__importDefault(require("./vfs_fonts"));
const app_1 = require("../../app");
const resources_1 = require("../../resources");
const utils_1 = require("../../utils");
async function MakePdf(op) {
    const { file_name = 'file_name', id = 'pdf', url, payload = {}, pdfFonts = [], tableLayouts = [], globLoader = true } = op;
    try {
        const pdfMake = await getPdfMake();
        const { content, images, background, watermark, defaultValues } = (0, resources_1.htmlToPdfMake)(op);
        const docDefinition = {
            defaultStyle: { font: 'SolaimanLipi' },
            content: content ?? [],
            images: images,
            background: background,
            watermark: watermark,
            ...defaultValues,
        };
        if (app_1.Config.app_env) {
            console.log('PDF Definition', docDefinition);
        }
        (0, resources_1.addCustomFonts)(pdfMake, pdfFonts);
        (0, resources_1.addCustomTableLayouts)(pdfMake, tableLayouts);
        if (globLoader) {
            utils_1.Loader.show('theDownloadLoader');
        }
        pdfMake
            .createPdf(docDefinition)
            .download(`${file_name}.pdf`)
            .then(() => {
            if (globLoader) {
                utils_1.Loader.hide('theDownloadLoader');
            }
            if (url) {
                http_1.Http.ajax.send({
                    element: id,
                    url,
                    payload,
                    dataType: 'json',
                    type: 'request',
                });
            }
        });
    }
    catch (e) {
        console.error('PDF generation', e);
        if (globLoader) {
            utils_1.Loader.hide('theDownloadLoader');
        }
    }
}
/* ---------------------------
   Load pdfMake lazily
----------------------------*/
async function getPdfMake() {
    const pdfMakeModule = await Promise.resolve().then(() => tslib_1.__importStar(require('pdfmake')));
    const pdfMakeInstance = pdfMakeModule.default || pdfMakeModule;
    pdfMakeInstance.vfs = vfs_fonts_1.default.vfs;
    /* Default fonts */
    pdfMakeInstance.addFontContainer(vfs_fonts_1.default);
    /* Table layouts */
    pdfMakeInstance.setTableLayouts({
        allDashBorders: {
            hLineStyle: () => ({ dash: { length: 3, space: 5 } }),
            vLineStyle: () => ({ dash: { length: 3, space: 5 } }),
        },
        admitCardBorder: {
            hLineWidth: () => 2,
            vLineWidth: () => 2,
            hLineColor: () => '#252161',
            vLineColor: () => '#252161',
        },
        allBorders: {
            hLineWidth: () => 1,
            vLineWidth: () => 1,
            hLineColor: () => 'black',
            paddingLeft: () => 5,
            paddingRight: () => 5,
        },
        horizontalBorders: {
            hLineWidth: () => 1,
            vLineWidth: () => 0,
            hLineColor: () => '#d1d1d1',
            paddingLeft: () => 8,
            paddingRight: () => 8,
        },
    });
    return pdfMakeInstance;
}
//# sourceMappingURL=pdfMake.js.map