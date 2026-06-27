/* ---------------------------
   Add Custom Fonts
----------------------------*/

import { Config } from '../../app';
import { CustomFont, CustomTableLayout, MakePdfOptions, PdfMakeWithFonts } from '../../types';
import { Content, DynamicBackground, ImageDefinition, Watermark } from 'pdfmake/interfaces';
import { Obj, Str } from '../../utils';

export function addCustomFonts(pdfMake: PdfMakeWithFonts, fonts: CustomFont[] = []) {
    if (!Array.isArray(fonts)) return;

    fonts.forEach((font: CustomFont) => {
        if (!font?.name) return;

        pdfMake.fonts[font.name] = {
            normal: font.n,
            bold: font.b ?? font.n,
            italics: font.i ?? font.n,
            bolditalics: font.bi ?? font.n,
        };
    });
}

/* ---------------------------
   Add Table Layouts
----------------------------*/

export function addCustomTableLayouts(pdfMake: typeof import('pdfmake'), layouts: CustomTableLayout[] = []) {
    if (!Array.isArray(layouts)) return;

    layouts.forEach((layout: CustomTableLayout) => {
        if (!layout?.name || !layout?.value) return;
        pdfMake.setTableLayouts({ [layout.name]: layout.value });
    });
}

export function htmlToPdfMake(op: MakePdfOptions) {
    const {
        id = 'pdf',
        dataTable = false,
        dataSrc = [],
        pdf = [],
        columns = [],
        perPage = 50,
        pageOrientation = 'portrait',
        pageSize = 'A4',
        pageMargins = [15, 100, 15, 35],
    } = op;

    const parentElement: HTMLElement | null = document.getElementById(id);

    if (!parentElement) {
        if (Config.app_env) throw new Error(`Element with ID "${id}" not found`);
        return {};
    }

    let content: Content[] = [] as Content[];
    const images: Record<string, string | ImageDefinition> | undefined = {};
    const background: DynamicBackground | Content | undefined = [];
    let watermark: string | Watermark | undefined = {} as Watermark;

    let defaultValues: MakePdfOptions = {
        pageOrientation,
        pageSize,
        pageMargins,
    };

    const pdfData: Element | null = parentElement.querySelector('.os-pdf-body');

    /* -----------------------
         DATA TABLE MODE
      ----------------------- */

    if (dataTable) {
        if (!Array.isArray(dataSrc) || dataSrc.length === 0) {
            return { content: [] };
        }

        const filterColumn = columns.filter((_, key) => pdf.includes(key));
        const dataPages = perPage ? Str.splitArray(dataSrc, perPage) : [dataSrc];

        dataPages.forEach((rows, pageIndex) => {
            content.push({
                stack: [tableStack(rows, { ...op, filterColumn }, images)],
                ...(pageIndex !== dataPages.length - 1 && { pageBreak: 'after' }),
            });

            rows.forEach((row: any) => {
                filterColumn.forEach((col: any) => {
                    if (col?.renderData?.type === 'image') {
                        const key = `image_${row?.id}`;
                        const src = col.renderData.data;
                        // const data = await urlToBase64(domain_url + src);
                        if (src) images[key] = Config.app_url + src;
                    }
                });
            });
        });
    } else {
        /* -----------------------
             HTML MODE
          ----------------------- */
        if (pdfData) {
            const pdfBody = createDomObject(sanitizeHtml(pdfData, 'os-pdf-body'));
            if (pdfBody) {
                const { pdfOptions = {}, stack } = pdfBody;

                content = stack ?? [];

                defaultValues = {
                    ...defaultValues,
                    ...pdfOptions,
                };
            }
        }
    }

    /* -----------------------
         HEADER
      ----------------------- */

    const header: HTMLDivElement | null = parentElement.querySelector('.os-pdf-header');

    if (header) {
        const headerObject = createDomObject(header);

        defaultValues.header = (currentPage: number, pageCount: number) => {
            const stack = addPageNumber(headerObject?.stack, { currentPage, pageCount }, 'tp');

            return [{ ...headerObject, stack }];
        };
    }

    /* -----------------------
         FOOTER
      ----------------------- */

    const footer: HTMLDivElement | null = parentElement.querySelector('.os-pdf-footer');

    if (footer) {
        const footerObject = createDomObject(footer);

        defaultValues.footer = (currentPage: number, pageCount: number) => {
            const stack = addPageNumber(footerObject?.stack, { currentPage, pageCount }, 'pp');

            return [{ ...footerObject, stack }];
        };
    }

    /* -----------------------
         DOM IMAGES
      ----------------------- */

    parentElement.querySelectorAll('img[alt]').forEach((img) => {
        const name = img.getAttribute('alt');
        const src = img.getAttribute('src');

        if (name && src) images[name] = src;
    });

    /* -----------------------
         BACKGROUND
      ----------------------- */

    const bg: HTMLDivElement | null = parentElement.querySelector('.os-pdf-bg-image');

    if (bg) background.push(createDomObject(bg));

    const watermarkImage: HTMLDivElement | null = parentElement.querySelector('.os-pdf-watermark-image');

    if (watermarkImage) background.push(createDomObject(watermarkImage));

    /* -----------------------
         TEXT WATERMARK
      ----------------------- */

    const watermarkElement = parentElement.querySelector('.os-pdf-watermark');

    if (watermarkElement) {
        let styles = {};

        const styleAttr = watermarkElement.getAttribute('data-style');

        if (styleAttr) {
            try {
                styles = Obj.jsonParse(styleAttr);
            } catch (e) {
                console.warn('Invalid watermark style JSON');
            }
        }

        watermark = {
            text: watermarkElement.textContent.trim(),
            ...styles,
        };
    }

    if (Config.app_env) console.log('PDF CONFIG:', defaultValues);

    return {
        content,
        images,
        background,
        watermark,
        defaultValues,
    };
}

export function createDomObject(element: HTMLDivElement | null): any {
    if (!element) return { text: '', opacity: 0.2 };

    const classes: string[] = [...element.classList];
    const tag = element.tagName.toLowerCase();

    let obj: any = { tag };

    if (classes.length) {
        obj.class = classes;

        if (classes.includes('os-pdf-page') && classes.includes('break-after')) {
            obj.pageBreak = 'after';
        }
    }

    if (classes.includes('row')) {
        obj.columns = mapChildren(element, 'col');
    } else if (classes.includes('table')) {
        obj = getTableObject(element);
    } else if (classes.includes('os-pdf-image')) {
        obj = getImageObject(element);
    } else if (classes.includes('os-pdf-svg')) {
        obj = getSvgObject(element);
    } else if (classes.includes('os-pdf-qr')) {
        obj = getQrCodeObject(element);
    } else if (classes.includes('os-pdf-inline-text')) {
        obj = getInlineText(element);
    } else if (classes.includes('os-pdf-page-count')) {
        obj = getPageCount(element);
    } else {
        obj.stack = mapChildren(element);
    }

    const pdfAttr: string | null = element.getAttribute('data-pdf');
    if (pdfAttr) obj.pdf = Obj.jsonParse(pdfAttr);

    const styleAttr = element.getAttribute('data-style');
    if (styleAttr) obj = { ...obj, ...Obj.jsonParse(styleAttr) };

    if (element.style.length) {
        const style: any = {};
        for (let i = 0; i < element.style.length; i++) {
            const name: string = element.style[i];
            style[cssToCamelCase(name)] = element.style.getPropertyValue(name);
        }
        obj.style = style;
    }

    return obj;
}

export function sanitizeHtml(data: Element, className: string): HTMLDivElement {
    const html = data.innerHTML.replace(/[\n\r]+|[\s]{2,}/g, '');
    const temp = document.createElement('div');

    if (className) temp.className = className;

    temp.innerHTML = html;

    return temp;
}

export function getQrCodeObject(element: HTMLDivElement) {
    const styles = Obj.jsonParse(element.getAttribute('data-style') || '{}');

    return {
        qr: element.getAttribute('data-qr-text')?.trim(),
        tag: 'div',
        ...styles,
    };
}

export function getPageCount(element: HTMLDivElement) {
    const styles = Obj.jsonParse(element.getAttribute('data-style') || '{}');

    return {
        text: '',
        tag: 'text',
        pageCount: 'yes',
        ...styles,
    };
}

export function getInlineText(element: HTMLDivElement) {
    const styles = Obj.jsonParse(element.getAttribute('data-style') || '{}');

    const innerText = element.innerHTML;

    const regex = /<span[^>]*data-style="(.*?)">(.*?)<\/span>/;

    const parts = innerText.split(regex).filter(Boolean);

    const text = [];

    for (let i = 0; i < parts.length; i++) {
        if (i % 3 === 1) {
            const style = Obj.jsonParse(parts[i].replace(/&quot;/g, '"'));
            const content = parts[i + 1];

            text.push({ style, text: content });
            i++;
        } else {
            text.push({ text: parts[i] });
        }
    }

    return {
        text,
        tag: 'text',
        ...styles,
    };
}

export function getSvgObject(element: HTMLDivElement) {
    const svg = element.innerHTML || '<svg width="100" height="100"><text>Test</text></svg>';

    const obj = { svg };

    if (Config.app_env) console.log(obj);

    return obj;
}

export function getImageObject(element: HTMLDivElement) {
    return {
        image: element.getAttribute('alt') || 'no_name_given',
    };
}

export function getTableObject(element: HTMLDivElement) {
    const tableObject = Obj.jsonParse(element.getAttribute('data-style') || '{}');

    const { layout = 'noBorders', headerRows } = tableObject;

    const { body, headerWidth } = getTableBodyContent(element.childNodes);

    return {
        layout,
        headerRows,
        table: {
            widths: headerWidth,
            body,
        },
    };
}

export function getTableBodyContent(nodes: NodeListOf<ChildNode>) {
    const body: any[] = [];
    const headerWidth: any[] = [];

    nodes.forEach((node: any) => {
        if (node.tagName !== 'THEAD' && node.tagName !== 'TBODY') return;

        node.childNodes.forEach((tr: any) => {
            if (tr.tagName !== 'TR') return;

            const trStyles = Obj.jsonParse(tr.getAttribute('data-style'));

            const columns: any[] = [];

            tr.childNodes.forEach((td: any) => {
                if (!td || !['TH', 'TD'].includes(td.tagName)) return;

                const styles = Obj.jsonParse(td.getAttribute('data-style'));

                const css: any = {};

                for (let i = 0; i < td.style.length; i++) {
                    const name = td.style[i];
                    css[cssToCamelCase(name)] = td.style.getPropertyValue(name);
                }

                const cell = {
                    ...css,
                    ...styles,
                    ...trStyles,
                };

                if (styles?.rowSpan) cell.rowSpan = styles.rowSpan;
                if (styles?.colSpan) cell.colSpan = styles.colSpan;

                if (td.childNodes.length) {
                    columns.push({
                        stack: [createDomObject(td)],
                        ...cell,
                    });
                } else {
                    columns.push({
                        text: td.textContent.trim(),
                        ...cell,
                    });
                }
            });

            if (columns.length) body.push(columns);
        });
    });

    const processedBody = getRowColSpanData(body);

    processedBody[0]?.forEach((col: any) => {
        headerWidth.push(col?.width || '*');
    });

    return { body: processedBody, headerWidth };
}

export function getRowColSpanData(data: any[]) {
    const body: any[] = [];

    data.forEach((row) => {
        const newRow: any[] = [];

        row.forEach((cell: any) => {
            if (cell?.colSpan) {
                newRow.push(cell);

                for (let i = 1; i < cell.colSpan; i++) {
                    newRow.push('');
                }
            } else {
                newRow.push(cell);
            }
        });

        body.push(newRow);
    });

    return body;
}

export function mapChildren(element: HTMLDivElement, type?: string) {
    const stack: any[] = [];

    element.childNodes.forEach((child: any) => {
        let width: string | number = '';

        if (type) {
            const size: number = child.getAttribute?.('data-col-size');
            if (size) width = (100 / 12) * size + '%';
        }

        if (child.nodeType === Node.ELEMENT_NODE) {
            const obj = createDomObject(child);

            if (width) obj.width = width;

            stack.push(obj);
        } else if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent.trim();

            if (!text) return;

            const obj: any = { text, tag: 'text' };

            if (width) obj.width = width;

            stack.push(obj);
        }
    });

    return stack;
}

export function addPageNumber(items: any, op: any = {}, type: string) {
    const { currentPage = 0, pageCount = 0 } = op;

    if (!items?.[0]?.columns) return items;

    items[0].columns = items[0].columns.map((col: any) => {
        if (col?.pageCount === 'yes') {
            col.text = type === 'pp' ? `${currentPage}/${pageCount}` : `Total Page: ${pageCount}`;
        }

        if (col?.stack) {
            col.stack = col.stack.map((item: any) => {
                if (item?.pageCount === 'yes') {
                    item.text = type === 'pp' ? `${currentPage}/${pageCount}` : `Total Page: ${pageCount}`;
                }

                return item;
            });
        }

        return col;
    });

    return items;
}

export function cssToCamelCase(prop: string): string {
    return prop.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
}

export function tableStack(rows: Record<string, any>, op: MakePdfOptions, images: Record<string, string | ImageDefinition> | undefined) {
    const { filterColumn } = op;

    const headerStyles = {
        fontSize: 10,
        alignment: 'left',
        color: 'white',
        fillColor: '#243545',
        ...op?.headerStyles,
    };

    const bodyStyles: Record<string, any> = {
        fontSize: 8,
        alignment: 'left',
        ...op?.bodyStyles,
    };

    const header: any = [];
    const widths: any = [];

    filterColumn.forEach((col: any) => {
        header.push({ text: col.title, ...headerStyles });
        widths.push(col?.pdfWidth === 'auto' ? 'auto' : col?.pdfWidth || '*');
    });

    const body = [header];

    rows.forEach((row: any) => {
        const dataRow: any = [];

        filterColumn.forEach((col: any) => {
            let access = col.data;
            const key = `image_${row?.id}`;
            if (col.renderData) {
                access = col.renderData.data;
                if (col.renderData.type === 'image') {
                    dataRow.push({
                        image: key,
                        ...bodyStyles,
                        ...col.renderData.imageStyles,
                    });
                }
            }

            const html = Obj.getNestedValue(access, row);

            if (typeof html === 'string' && /<[^>]+>/.test(html) && typeof images !== 'undefined') {
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const img = doc.querySelector('img');
                const src = img?.getAttribute('src');
                const style: string | null | undefined = img?.getAttribute('style');
                const imageStyles = typeof style === 'string' && typeof style !== 'undefined' ? Obj.jsonParse(style) : null;
                if (src) {
                    images[key] = src;
                    dataRow.push({
                        image: key,
                        ...bodyStyles,
                        ...imageStyles,
                    });
                }
            } else {
                dataRow.push({
                    text: Str.escapeHtml(Obj.getNestedValue(access, row)),
                    ...bodyStyles,
                });
            }
        });

        body.push(dataRow);
    });

    return {
        layout: 'allBorders',
        table: {
            widths,
            body,
        },
    };
}
