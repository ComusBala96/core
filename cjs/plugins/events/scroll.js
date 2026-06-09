"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollToHideShow = scrollToHideShow;
function scrollToHideShow(handleEvent) {
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleEvent?.();
                ticking = false;
            });
            ticking = true;
        }
    });
}
//# sourceMappingURL=scroll.js.map