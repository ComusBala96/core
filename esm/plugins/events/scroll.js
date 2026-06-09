export function scrollToHideShow(handleEvent) {
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