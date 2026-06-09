var _a;
import { createImageUrl, getMimes, urlToBase64 } from '../../helpers';
export class Blob {
    static createImageUrl(file) {
        return createImageUrl(file);
    }
    static getMimes(mimetypes) {
        return getMimes(mimetypes);
    }
}
_a = Blob;
Blob.urlToBase64 = async (url) => {
    return await urlToBase64(url);
};
//# sourceMappingURL=blob.js.map