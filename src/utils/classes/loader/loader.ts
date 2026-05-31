import { displayErrors, hideLoader, jsonShow, showLoader } from '../../helpers';

export class Loader {
    static show(id: string = 'theGlobalLoader') {
        return showLoader(id);
    }
    static hide(id: string = 'theGlobalLoader') {
        return hideLoader(id);
    }
    static showErrors(errors: Record<string, string[]>) {
        return jsonShow(errors);
    }
    static displayErrors(id: string, html: string) {
        return displayErrors(id, html);
    }
}
