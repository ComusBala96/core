"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dom = void 0;
const helpers_1 = require("../../helpers");
class Dom {
    static getElementById(id) {
        return (0, helpers_1.getElementById)(id);
    }
    static getElementByClass(className) {
        return (0, helpers_1.getElementByClass)(className);
    }
    static querySelector(selector, root = document) {
        return (0, helpers_1.querySelector)(selector, root);
    }
    static querySelectorAll(selector, root = document) {
        return (0, helpers_1.querySelectorAll)(selector, root);
    }
    static closest(el, selector) {
        return (0, helpers_1.closest)(el, selector);
    }
    static event(event, element, callback) {
        return (0, helpers_1.on)(event, element, callback);
    }
}
exports.Dom = Dom;
//# sourceMappingURL=dom.js.map