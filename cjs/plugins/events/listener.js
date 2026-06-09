"use strict";
/* -----------------------------
   Click to hide
----------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
exports.clickToHide = clickToHide;
exports.backToTop = backToTop;
exports.changeColor = changeColor;
exports.initLazyImages = initLazyImages;
function clickToHide(handleEvent) {
    document.addEventListener('click', (e) => {
        handleEvent?.(e);
    });
}
/* -----------------------------
   Back to top
----------------------------- */
function backToTop(el, handleEvent) {
    const element = document.getElementById(el);
    if (!element)
        return;
    element.addEventListener('click', () => {
        handleEvent?.();
    });
}
function changeColor(op = {}) {
    const { elements = [], targets = [] } = op;
    elements.forEach((element, i) => {
        $(`#${element}`).on('input change', function () {
            const value = $(this).val();
            if (typeof value === 'string') {
                $(`#${targets[i]}`).val(value);
            }
        });
    });
}
function initLazyImages(root = document) {
    const images = root.querySelectorAll('img.lazy-img[data-src]');
    /* ---------- Fallback ---------- */
    if (!('IntersectionObserver' in window)) {
        images.forEach((img) => {
            const src = img.dataset.src;
            if (src) {
                img.src = src;
                img.classList.add('loaded');
            }
        });
        return;
    }
    /* ---------- Observer ---------- */
    if (!window.__lazyObserver) {
        window.__lazyObserver = null;
    }
    if (window.__lazyObserver) {
        window.__lazyObserver.disconnect();
    }
    window.__lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting)
                return;
            const img = entry.target;
            const src = img.dataset.src;
            if (!src || img.dataset.loaded) {
                observer.unobserve(img);
                return;
            }
            const temp = new Image();
            temp.src = src;
            temp.onload = () => {
                img.src = src;
                img.dataset.loaded = 'true';
                img.classList.add('loaded');
            };
            observer.unobserve(img);
        });
    }, {
        rootMargin: '150px',
        threshold: 0.01,
    });
    images.forEach((img) => window.__lazyObserver.observe(img));
}
//# sourceMappingURL=listener.js.map