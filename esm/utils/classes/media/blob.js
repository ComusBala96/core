var _a;
import { createImageUrl, formatFileSize, getMimes, urlToBase64 } from '../../helpers';
export class Blob {
    static createImageUrl(file) {
        return createImageUrl(file);
    }
    static getMimes(mimetypes) {
        return getMimes(mimetypes);
    }
    static formatFileSize(bytes) {
        return formatFileSize(bytes);
    }
}
_a = Blob;
Blob.urlToBase64 = async (url) => {
    return await urlToBase64(url);
};
//# sourceMappingURL=blob.js.map