import { CustomFont, CustomTableLayout, MakePdfOptions, PdfMakeWithFonts } from '../../types';
import { Content, ImageDefinition, Watermark } from 'pdfmake/interfaces';
export declare function addCustomFonts(pdfMake: PdfMakeWithFonts, fonts?: CustomFont[]): void;
export declare function addCustomTableLayouts(pdfMake: typeof import('pdfmake'), layouts?: CustomTableLayout[]): void;
export declare function htmlToPdfMake(op: MakePdfOptions): {
    content?: undefined;
    images?: undefined;
    background?: undefined;
    watermark?: undefined;
    defaultValues?: undefined;
} | {
    content: never[];
    images?: undefined;
    background?: undefined;
    watermark?: undefined;
    defaultValues?: undefined;
} | {
    content: Content[];
    images: Record<string, string | ImageDefinition>;
    background: Content[];
    watermark: Watermark;
    defaultValues: MakePdfOptions;
};
export declare function createDomObject(element: HTMLDivElement | null): any;
export declare function sanitizeHtml(data: Element, className: string): HTMLDivElement;
export declare function getQrCodeObject(element: HTMLDivElement): {
    qr: string | undefined;
    tag: string;
};
export declare function getPageCount(element: HTMLDivElement): {
    text: string;
    tag: string;
    pageCount: string;
};
export declare function getInlineText(element: HTMLDivElement): {
    text: ({
        style: Record<string, any>;
        text: string;
    } | {
        text: string;
        style?: undefined;
    })[];
    tag: string;
};
export declare function getSvgObject(element: HTMLDivElement): {
    svg: string;
};
export declare function getImageObject(element: HTMLDivElement): {
    image: string;
};
export declare function getTableObject(element: HTMLDivElement): {
    layout: any;
    headerRows: any;
    table: {
        widths: any[];
        body: any[];
    };
};
export declare function getTableBodyContent(nodes: NodeListOf<ChildNode>): {
    body: any[];
    headerWidth: any[];
};
export declare function getRowColSpanData(data: any[]): any[];
export declare function mapChildren(element: HTMLDivElement, type?: string): any[];
export declare function addPageNumber(items: any, op: any | undefined, type: string): any;
export declare function cssToCamelCase(prop: string): string;
export declare function tableStack(rows: Record<string, any>, op: MakePdfOptions, images: Record<string, string | ImageDefinition> | undefined): {
    layout: string;
    table: {
        widths: any;
        body: any[];
    };
};
//# sourceMappingURL=pdf.d.ts.map