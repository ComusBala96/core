import { closest, getElementByClass, getElementById, on, querySelector, querySelectorAll } from '../../helpers';

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

    static on(event: string, selector: string, handler: (e: Event, target: HTMLElement) => void | Promise<void>, options?: AddEventListenerOptions) {
        return on(event, selector, handler, options);
    }
}
