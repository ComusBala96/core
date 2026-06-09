import { displayErrors, hideLoader, validationShow, showLoader } from '../../helpers';
export class Loader {
    static show(id = 'theGlobalLoader') {
        return showLoader(id);
    }
    static hide(id = 'theGlobalLoader') {
        return hideLoader(id);
    }
    static showErrors(errors) {
        return validationShow(errors);
    }
    static displayErrors(id, html) {
        return displayErrors(id, html);
    }
}
//# sourceMappingURL=loader.js.map