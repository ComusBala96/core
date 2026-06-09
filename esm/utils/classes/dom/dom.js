import { closest, getElementByClass, getElementById, querySelector, on, querySelectorAll } from '../../helpers';
export class Dom {
    static getElementById(id) {
        return getElementById(id);
    }
    static getElementByClass(className) {
        return getElementByClass(className);
    }
    static querySelector(selector, root = document) {
        return querySelector(selector, root);
    }
    static querySelectorAll(selector, root = document) {
        return querySelectorAll(selector, root);
    }
    static closest(el, selector) {
        return closest(el, selector);
    }
    static event(event, element, callback) {
        return on(event, element, callback);
    }
}
//# sourceMappingURL=dom.js.map