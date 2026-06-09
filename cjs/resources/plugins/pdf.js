"use strict";
/* ---------------------------
   Add Custom Fonts
----------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCustomFonts = addCustomFonts;
exports.addCustomTableLayouts = addCustomTableLayouts;
exports.htmlToPdfMake = htmlToPdfMake;
exports.createDomObject = createDomObject;
exports.sanitizeHtml = sanitizeHtml;
exports.getQrCodeObject = getQrCodeObject;
exports.getPageCount = getPageCount;
exports.getInlineText = getInlineText;
exports.getSvgObject = getSvgObject;
exports.getImageObject = getImageObject;
exports.getTableObject = getTableObject;
exports.getTableBodyContent = getTableBodyContent;
exports.getRowColSpanData = getRowColSpanData;
exports.mapChildren = mapChildren;
exports.addPageNumber = addPageNumber;
exports.cssToCamelCase = cssToCamelCase;
exports.tableStack = tableStack;
const app_1 = require("../../app");
const utils_1 = require("../../utils");
function addCustomFonts(pdfMake, fonts = []) {
    if (!Array.isArray(fonts))
        return;
    fonts.forEach((font) => {
        if (!font?.name)
            return;
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
function addCustomTableLayouts(pdfMake, layouts = []) {
    if (!Array.isArray(layouts))
        return;
    layouts.forEach((layout) => {
        if (!layout?.name || !layout?.value)
            return;
        pdfMake.setTableLayouts({ [layout.name]: layout.value });
    });
}
function htmlToPdfMake(op) {
    const { id = 'pdf', dataTable = false, dataSrc = [], pdf = [], columns = [], perPage = 50, pageOrientation = 'portrait', pageSize = 'A4', pageMargins = [15, 100, 15, 35], } = op;
    const parentElement = document.getElementById(id);
    if (!parentElement) {
        if (app_1.Config.app_env)
            throw new Error(`Element with ID "${id}" not found`);
        return {};
    }
    let content = [];
    const images = {};
    const background = [];
    let watermark = {};
    let defaultValues = {
        pageOrientation,
        pageSize,
        pageMargins,
    };
    const pdfData = parentElement.querySelector('.os-pdf-body');
    /* -----------------------
         DATA TABLE MODE
      ----------------------- */
    if (dataTable) {
        if (!Array.isArray(dataSrc) || dataSrc.length === 0) {
            return { content: [] };
        }
        const filterColumn = columns.filter((_, key) => pdf.includes(key));
        const dataPages = perPage ? utils_1.Str.splitArray(dataSrc, perPage) : [dataSrc];
        dataPages.forEach((rows, pageIndex) => {
            content.push({
                stack: [tableStack(rows, { ...op, filterColumn }, images)],
                ...(pageIndex !== dataPages.length - 1 && { pageBreak: 'after' }),
            });
            rows.forEach((row) => {
                filterColumn.forEach((col) => {
                    if (col?.renderData?.type === 'image') {
                        const key = `image_${row?.id}`;
                        const src = col.renderData.data;
                        // const data = await urlToBase64(domain_url + src);
                        if (src)
                            images[key] = app_1.Config.app_url + src;
                    }
                });
            });
        });
    }
    else {
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
    const header = parentElement.querySelector('.os-pdf-header');
    if (header) {
        const headerObject = createDomObject(header);
        defaultValues.header = (currentPage, pageCount) => {
            const stack = addPageNumber(headerObject?.stack, { currentPage, pageCount }, 'tp');
            return [{ ...headerObject, stack }];
        };
    }
    /* -----------------------
         FOOTER
      ----------------------- */
    const footer = parentElement.querySelector('.os-pdf-footer');
    if (footer) {
        const footerObject = createDomObject(footer);
        defaultValues.footer = (currentPage, pageCount) => {
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
        if (name && src)
            images[name] = src;
    });
    /* -----------------------
         BACKGROUND
      ----------------------- */
    const bg = parentElement.querySelector('.os-pdf-bg-image');
    if (bg)
        background.push(createDomObject(bg));
    const watermarkImage = parentElement.querySelector('.os-pdf-watermark-image');
    if (watermarkImage)
        background.push(createDomObject(watermarkImage));
    /* -----------------------
         TEXT WATERMARK
      ----------------------- */
    const watermarkElement = parentElement.querySelector('.os-pdf-watermark');
    if (watermarkElement) {
        let styles = {};
        const styleAttr = watermarkElement.getAttribute('data-style');
        if (styleAttr) {
            try {
                styles = utils_1.Obj.jsonParse(styleAttr);
            }
            catch (e) {
                console.warn('Invalid watermark style JSON');
            }
        }
        watermark = {
            text: watermarkElement.textContent.trim(),
            ...styles,
        };
    }
    if (app_1.Config.app_env)
        console.log('PDF CONFIG:', defaultValues);
    return {
        content,
        images,
        background,
        watermark,
        defaultValues,
    };
}
// export const parseJSON = (value: string | null, fallback = {}) => {
//     try {
//         return value ? Obj.jsonParse(value) : fallback;
//     } catch {
//         return fallback;
//     }
// };
function createDomObject(element) {
    if (!element)
        return { text: '', opacity: 0.2 };
    const classes = [...element.classList];
    const tag = element.tagName.toLowerCase();
    let obj = { tag };
    if (classes.length) {
        obj.class = classes;
        if (classes.includes('os-pdf-page') && classes.includes('break-after')) {
            obj.pageBreak = 'after';
        }
    }
    if (classes.includes('row')) {
        obj.columns = mapChildren(element, 'col');
    }
    else if (classes.includes('table')) {
        obj = getTableObject(element);
    }
    else if (classes.includes('os-pdf-image')) {
        obj = getImageObject(element);
    }
    else if (classes.includes('os-pdf-svg')) {
        obj = getSvgObject(element);
    }
    else if (classes.includes('os-pdf-qr')) {
        obj = getQrCodeObject(element);
    }
    else if (classes.includes('os-pdf-inline-text')) {
        obj = getInlineText(element);
    }
    else if (classes.includes('os-pdf-page-count')) {
        obj = getPageCount(element);
    }
    else {
        obj.stack = mapChildren(element);
    }
    const pdfAttr = element.getAttribute('data-pdf');
    if (pdfAttr)
        obj.pdf = utils_1.Obj.jsonParse(pdfAttr);
    const styleAttr = element.getAttribute('data-style');
    if (styleAttr)
        obj = { ...obj, ...utils_1.Obj.jsonParse(styleAttr) };
    if (element.style.length) {
        const style = {};
        for (let i = 0; i < element.style.length; i++) {
            const name = element.style[i];
            style[cssToCamelCase(name)] = element.style.getPropertyValue(name);
        }
        obj.style = style;
    }
    return obj;
}
function sanitizeHtml(data, className) {
    const html = data.innerHTML.replace(/[\n\r]+|[\s]{2,}/g, '');
    const temp = document.createElement('div');
    if (className)
        temp.className = className;
    temp.innerHTML = html;
    return temp;
}
function getQrCodeObject(element) {
    const styles = utils_1.Obj.jsonParse(element.getAttribute('data-style') || '{}');
    return {
        qr: element.getAttribute('data-qr-text')?.trim(),
        tag: 'div',
        ...styles,
    };
}
function getPageCount(element) {
    const styles = utils_1.Obj.jsonParse(element.getAttribute('data-style') || '{}');
    return {
        text: '',
        tag: 'text',
        pageCount: 'yes',
        ...styles,
    };
}
function getInlineText(element) {
    const styles = utils_1.Obj.jsonParse(element.getAttribute('data-style') || '{}');
    const innerText = element.innerHTML;
    const regex = /<span[^>]*data-style="(.*?)">(.*?)<\/span>/;
    const parts = innerText.split(regex).filter(Boolean);
    const text = [];
    for (let i = 0; i < parts.length; i++) {
        if (i % 3 === 1) {
            const style = utils_1.Obj.jsonParse(parts[i].replace(/&quot;/g, '"'));
            const content = parts[i + 1];
            text.push({ style, text: content });
            i++;
        }
        else {
            text.push({ text: parts[i] });
        }
    }
    return {
        text,
        tag: 'text',
        ...styles,
    };
}
function getSvgObject(element) {
    const svg = element.innerHTML || '<svg width="100" height="100"><text>Test</text></svg>';
    const obj = { svg };
    if (app_1.Config.app_env)
        console.log(obj);
    return obj;
}
function getImageObject(element) {
    return {
        image: element.getAttribute('alt') || 'no_name_given',
    };
}
function getTableObject(element) {
    const tableObject = utils_1.Obj.jsonParse(element.getAttribute('data-style') || '{}');
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
function getTableBodyContent(nodes) {
    const body = [];
    const headerWidth = [];
    nodes.forEach((node) => {
        if (node.tagName !== 'THEAD' && node.tagName !== 'TBODY')
            return;
        node.childNodes.forEach((tr) => {
            if (tr.tagName !== 'TR')
                return;
            const trStyles = utils_1.Obj.jsonParse(tr.getAttribute('data-style'));
            const columns = [];
            tr.childNodes.forEach((td) => {
                if (!td || !['TH', 'TD'].includes(td.tagName))
                    return;
                const styles = utils_1.Obj.jsonParse(td.getAttribute('data-style'));
                const css = {};
                for (let i = 0; i < td.style.length; i++) {
                    const name = td.style[i];
                    css[cssToCamelCase(name)] = td.style.getPropertyValue(name);
                }
                const cell = {
                    ...css,
                    ...styles,
                    ...trStyles,
                };
                if (styles?.rowSpan)
                    cell.rowSpan = styles.rowSpan;
                if (styles?.colSpan)
                    cell.colSpan = styles.colSpan;
                if (td.childNodes.length) {
                    columns.push({
                        stack: [createDomObject(td)],
                        ...cell,
                    });
                }
                else {
                    columns.push({
                        text: td.textContent.trim(),
                        ...cell,
                    });
                }
            });
            if (columns.length)
                body.push(columns);
        });
    });
    const processedBody = getRowColSpanData(body);
    processedBody[0]?.forEach((col) => {
        headerWidth.push(col?.width || '*');
    });
    return { body: processedBody, headerWidth };
}
function getRowColSpanData(data) {
    const body = [];
    data.forEach((row) => {
        const newRow = [];
        row.forEach((cell) => {
            if (cell?.colSpan) {
                newRow.push(cell);
                for (let i = 1; i < cell.colSpan; i++) {
                    newRow.push('');
                }
            }
            else {
                newRow.push(cell);
            }
        });
        body.push(newRow);
    });
    return body;
}
function mapChildren(element, type) {
    const stack = [];
    element.childNodes.forEach((child) => {
        let width = '';
        if (type) {
            const size = child.getAttribute?.('data-col-size');
            if (size)
                width = (100 / 12) * size + '%';
        }
        if (child.nodeType === Node.ELEMENT_NODE) {
            const obj = createDomObject(child);
            if (width)
                obj.width = width;
            stack.push(obj);
        }
        else if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent.trim();
            if (!text)
                return;
            const obj = { text, tag: 'text' };
            if (width)
                obj.width = width;
            stack.push(obj);
        }
    });
    return stack;
}
function addPageNumber(items, op = {}, type) {
    const { currentPage = 0, pageCount = 0 } = op;
    if (!items?.[0]?.columns)
        return items;
    items[0].columns = items[0].columns.map((col) => {
        if (col?.pageCount === 'yes') {
            col.text = type === 'pp' ? `${currentPage}/${pageCount}` : `Total Page: ${pageCount}`;
        }
        if (col?.stack) {
            col.stack = col.stack.map((item) => {
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
function cssToCamelCase(prop) {
    return prop.replace(/-([a-z])/g, (_, l) => l.toUpperCase());
}
function tableStack(rows, op, images) {
    const { filterColumn } = op;
    const headerStyles = {
        fontSize: 10,
        alignment: 'left',
        color: 'white',
        fillColor: '#243545',
        ...op?.headerStyles,
    };
    const bodyStyles = {
        fontSize: 8,
        alignment: 'left',
        ...op?.bodyStyles,
    };
    const header = [];
    const widths = [];
    filterColumn.forEach((col) => {
        header.push({ text: col.title, ...headerStyles });
        widths.push(col?.pdfWidth === 'auto' ? 'auto' : col?.pdfWidth || '*');
    });
    const body = [header];
    rows.forEach((row) => {
        const dataRow = [];
        filterColumn.forEach((col) => {
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
            const html = utils_1.Obj.getNestedValue(access, row);
            if (typeof html === 'string' && /<[^>]+>/.test(html) && typeof images !== 'undefined') {
                const doc = new DOMParser().parseFromString(html, 'text/html');
                const img = doc.querySelector('img');
                const src = img?.getAttribute('src');
                const style = img?.getAttribute('style');
                const imageStyles = typeof style === 'string' && typeof style !== 'undefined' ? utils_1.Obj.jsonParse(style) : null;
                if (src) {
                    images[key] = src;
                    dataRow.push({
                        image: key,
                        ...bodyStyles,
                        ...imageStyles,
                    });
                }
            }
            else {
                dataRow.push({
                    text: utils_1.Str.escapeHtml(utils_1.Obj.getNestedValue(access, row)),
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
//# sourceMappingURL=pdf.js.map