/**
 *  DOM Definitions
 */

import moment from 'moment';

/**
 * Safely get DOM element by id.
 * @param id Element id.
 * @example <input id="pageLang" /> | <div id="content"></div>.
 * @return Element or throw error if not found.
 */
export function getElementById(id: string): JQuery<HTMLElement> | HTMLFormElement {
    const el = $('#' + id);
    if (!el.length) {
        throw new Error(`"${id}" not found. Please define #${id}.`);
    }
    return el as JQuery<HTMLElement> | HTMLFormElement;
}
/**
 * Safely get DOM element by class.
 * @param className Element id.
 * @example <input class="pageLang" /> | <div class="content"></div>.
 * @return Element or throw error if not found.
 */
export function getElementByClass(className: string): JQuery<HTMLElement> {
    const el = $('.' + className);
    if (!el.length) {
        throw new Error(`"${className}" not found. Please define .${className}.`);
    }
    return el as JQuery<HTMLElement>;
}

/**
 * Safely get DOM element.
 * @param selector id | class.
 * @param root default = document.
 * @example selector = id | class, root = document.
 * @return the first element that is a descendant of node that matches selectors.
 */
export function querySelector<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T | null {
    return root.querySelector(selector) as T | null;
}

/**
 * Safely get DOM elements
 * @param selector id | class.
 * @param root default = document.
 * @example selector = id | class, root = document
 * @return array of all element descendants of node that match selectors.
 */
export function querySelectorAll<T extends Element = HTMLElement>(selector: string, root: ParentNode = document): T[] {
    return Array.from(root.querySelectorAll(selector)) as T[];
}

export function liveClock(selector: string): void {
    setInterval(() => {
        const el = getElementByClass(selector);
        el.text(moment().format('MMMM Do, YYYY, h:mm:ss A'));
    }, 1000);
}
/**
 * Safely get closest DOM element.
 * @param el DOM element.
 * @param selector id | class.
 * @example el = DOM element, selector = id | class
 * @return the closest element descendants of node that match selectors.
 */
export function closest(el: EventTarget | null, selector: string): HTMLElement | null {
    return (el as HTMLElement | null)?.closest?.(selector) || null;
}

/**
 * Event Listeners.
 * @param event click | change
 * @param  selector id | class.
 * @param  handler callback function.
 * @param  e Event
 * @param  target HTMLElement
 * @param options boolean | AddEventListenerOptions
 * @example on('click', 'pageLang', (e,target) => {
 *      e.preventDefault();
 *      ...
 *      ...
 *      other logics
 * }, true);
 * @return void.
 */
export function on(event: string, selector: string, handler: (e: Event, target: HTMLElement) => void | Promise<void>, options?: boolean | AddEventListenerOptions) {
    document.addEventListener(
        event,
        async (e) => {
            const target = closest(e.target, selector);
            if (!target) return;
            await handler(e, target);
        },
        options,
    );
}



