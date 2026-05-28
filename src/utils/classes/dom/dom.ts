import { closest, getElementByClass, getElementById, querySelector, on, querySelectorAll } from '../../helpers';

export class Dom {
    static getElementById(id: string): JQuery<HTMLElement> | HTMLFormElement {
        return getElementById(id);
    }

    static getElementByClass(className: string): JQuery<HTMLElement> {
        return getElementByClass(className);
    }

    static querySelector(selector: string, root: ParentNode = document): HTMLElement | null {
        return querySelector(selector, root);
    }

    static querySelectorAll(selector: string, root: ParentNode = document): HTMLElement[] {
        return querySelectorAll(selector, root);
    }

    static closest(el: EventTarget | null, selector: string): HTMLElement | null {
        return closest(el, selector);
    }

    static event(event: string, element: string, callback: (e: JQuery.TriggeredEvent, element: HTMLElement) => void) {
        return on(event, element, callback);
    }
}
