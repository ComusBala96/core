/**
 *  Blob Definitions
 */
/**
 * It creates a string containing a blob URL pointing to the object given in the parameter.
 * @param file file path
 * @return blob URL
 */
export declare function createImageUrl(file: File): string;
/**
 * Convert url to base64 string
 * @param url file path
 * @return promise
 */
export declare const urlToBase64: (url: string) => Promise<string>;
/**
 * Mime parser
 * @param mimetypes string
 * @return string
 */
export declare function getMimes(mimetypes: string): string;
export declare function formatFileSize(bytes: number): string;
//# sourceMappingURL=blob.d.ts.map