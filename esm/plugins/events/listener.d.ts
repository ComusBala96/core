export declare function clickToHide(handleEvent?: (e: MouseEvent) => void): void;
export declare function backToTop(el: string, handleEvent?: () => void): void;
interface ChangeColorOptions {
    elements?: string[];
    targets?: string[];
}
export declare function changeColor(op?: ChangeColorOptions): void;
declare global {
    interface Window {
        __lazyObserver?: IntersectionObserver | null;
    }
}
export declare function initLazyImages(root?: Document | HTMLElement): void;
export {};
//# sourceMappingURL=listener.d.ts.map