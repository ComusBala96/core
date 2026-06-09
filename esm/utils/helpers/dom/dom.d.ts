/**
 *  DOM Definitions
 */
/**
 * Safely get DOM element by id.
 * @param id Element id.
 * @example <input id="pageLang" /> | <div id="content"></div>.
 * @return Element or throw error if not found.
 */
export declare function getElementById(id: string): JQuery<HTMLElement> | HTMLFormElement;
/**
 * Safely get DOM element by class.
 * @param className Element id.
 * @example <input class="pageLang" /> | <div class="content"></div>.
 * @return Element or throw error if not found.
 */
export declare function getElementByClass(className: string): JQuery<HTMLElement>;
/**
 * Safely get DOM element.
 * @param selector id | class.
 * @param root default = document.
 * @example selector = id | class, root = document.
 * @return the first element that is a descendant of node that matches selectors.
 */
export declare function querySelector<T extends Element = HTMLElement>(selector: string, root?: ParentNode): T | null;
/**
 * Safely get DOM elements
 * @param selector id | class.
 * @param root default = document.
 * @example selector = id | class, root = document
 * @return array of all element descendants of node that match selectors.
 */
export declare function querySelectorAll<T extends Element = HTMLElement>(selector: string, root?: ParentNode): T[];
export declare function liveClock(selector: string): void;
/**
 * Safely get closest DOM element.
 * @param el DOM element.
 * @param selector id | class.
 * @example el = DOM element, selector = id | class
 * @return the closest element descendants of node that match selectors.
 */
export declare function closest(el: EventTarget | null, selector: string): HTMLElement | null;
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
export declare function on(event: string, element: string, callback: (e: JQuery.TriggeredEvent, element: HTMLElement) => void): void;
//# sourceMappingURL=dom.d.ts.map