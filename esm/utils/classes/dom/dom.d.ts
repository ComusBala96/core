export declare class Dom {
    static getElementById(id: string): JQuery<HTMLElement> | HTMLFormElement;
    static getElementByClass(className: string): JQuery<HTMLElement>;
    static querySelector(selector: string, root?: ParentNode): HTMLElement | null;
    static querySelectorAll(selector: string, root?: ParentNode): HTMLElement[];
    static closest(el: EventTarget | null, selector: string): HTMLElement | null;
    static event(event: string, element: string, callback: (e: JQuery.TriggeredEvent, element: HTMLElement) => void): void;
}
//# sourceMappingURL=dom.d.ts.map