/**
 *  Blob Definitions
 */
/**
 * It creates a string containing a blob URL pointing to the object given in the parameter.
 * @param file file path
 * @return blob URL
 */
export function createImageUrl(file) {
    return URL.createObjectURL(file);
}
/**
 * Convert url to base64 string
 * @param url file path
 * @return promise
 */
export const urlToBase64 = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
/**
 * Mime parser
 * @param mimetypes string
 * @return string
 */
export function getMimes(mimetypes) {
    return mimetypes
        .split(',')
        .map((type) => type.split('/')[1])
        .join('|');
}
//# sourceMappingURL=blob.js.map