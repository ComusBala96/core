import { Http } from '../../http';
import fontContainer from './vfs_fonts';
import { Config } from '../../app';
import { addCustomFonts, addCustomTableLayouts, htmlToPdfMake } from '../../resources';
import { Loader } from '../../utils';
export async function MakePdf(op) {
    const { file_name = 'file_name', id = 'pdf', url, payload = {}, pdfFonts = [], tableLayouts = [], globLoader = true } = op;
    try {
        const pdfMake = await getPdfMake();
        const { content, images, background, watermark, defaultValues } = htmlToPdfMake(op);
        const docDefinition = {
            defaultStyle: { font: 'SolaimanLipi' },
            content: content ?? [],
            images: images,
            background: background,
            watermark: watermark,
            ...defaultValues,
        };
        if (Config.app_env) {
            console.log('PDF Definition', docDefinition);
        }
        addCustomFonts(pdfMake, pdfFonts);
        addCustomTableLayouts(pdfMake, tableLayouts);
        if (globLoader) {
            Loader.show('theDownloadLoader');
        }
        pdfMake
            .createPdf(docDefinition)
            .download(`${file_name}.pdf`)
            .then(() => {
            if (globLoader) {
                Loader.hide('theDownloadLoader');
            }
            if (url) {
                Http.ajax.send({
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
            Loader.hide('theDownloadLoader');
        }
    }
}
/* ---------------------------
   Load pdfMake lazily
----------------------------*/
export async function getPdfMake() {
    const pdfMakeModule = await import('pdfmake');
    const pdfMakeInstance = pdfMakeModule.default || pdfMakeModule;
    pdfMakeInstance.vfs = fontContainer.vfs;
    /* Default fonts */
    pdfMakeInstance.addFontContainer(fontContainer);
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