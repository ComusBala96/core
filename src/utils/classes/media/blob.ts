import { createImageUrl, getMimes, urlToBase64 } from '../../helpers';

export class Blob {
    static createImageUrl(file: File): string {
        return createImageUrl(file);
    }

    static urlToBase64 = async (url: string): Promise<string> => {
        return await urlToBase64(url);
    };

    static getMimes(mimetypes: string): string {
        return getMimes(mimetypes);
    }
}
