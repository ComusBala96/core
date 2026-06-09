"use strict";
/**
 *  Blob Definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlToBase64 = void 0;
exports.createImageUrl = createImageUrl;
exports.getMimes = getMimes;
/**
 * It creates a string containing a blob URL pointing to the object given in the parameter.
 * @param file file path
 * @return blob URL
 */
function createImageUrl(file) {
    return URL.createObjectURL(file);
}
/**
 * Convert url to base64 string
 * @param url file path
 * @return promise
 */
const urlToBase64 = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
exports.urlToBase64 = urlToBase64;
/**
 * Mime parser
 * @param mimetypes string
 * @return string
 */
function getMimes(mimetypes) {
    return mimetypes
        .split(',')
        .map((type) => type.split('/')[1])
        .join('|');
}
//# sourceMappingURL=blob.js.map