/**
 *  Blob Definitions
 */

/**
 * It creates a string containing a blob URL pointing to the object given in the parameter.
 * @param file file path
 * @return blob URL
 */
export function createImageUrl(file: File): string {
    return URL.createObjectURL(file);
}

/**
 * Convert url to base64 string
 * @param url file path
 * @return promise
 */
export const urlToBase64 = async (url: string): Promise<string> => {
    const res = await fetch(url);
    const blob = await res.blob();

    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

/**
 * Mime parser
 * @param mimetypes string
 * @return string
 */
export function getMimes(mimetypes: string): string {
    return mimetypes
        .split(',')
        .map((type) => type.split('/')[1])
        .join('|');
}

export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const units = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + units[i];
}
