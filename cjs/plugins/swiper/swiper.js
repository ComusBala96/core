"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swiper = swiper;
const tslib_1 = require("tslib");
const swiper_1 = tslib_1.__importDefault(require("swiper"));
const modules_1 = require("swiper/modules");
function swiper(config) {
    if (typeof config === 'boolean') {
        config = [];
    }
    config.forEach((cfg) => {
        const { element, direction = 'horizontal', slidesPerView = 1, spaceBetween = 10, loop = false, autoplay = false, navigation = false, pagination = false, breakpoints = {}, freeMode = false, grabCursor = false, mousewheel = { enabled: false } } = cfg;
        const selector = `.${element}`;
        if (!document.querySelector(selector))
            return;
        new swiper_1.default(selector, {
            direction,
            slidesPerView,
            spaceBetween,
            loop,
            autoplay,
            navigation,
            pagination,
            freeMode,
            grabCursor,
            mousewheel,
            breakpoints: {
                496: {
                    slidesPerView: breakpoints.xs ?? slidesPerView,
                    mousewheel: { enabled: false },
                    grabCursor: false,
                },
                640: {
                    slidesPerView: breakpoints.sm ?? slidesPerView,
                    mousewheel: { enabled: false },
                    grabCursor: false,
                },
                768: {
                    slidesPerView: breakpoints.md ?? slidesPerView,
                    mousewheel: { enabled: false },
                    grabCursor: false,
                },
                1024: {
                    slidesPerView: breakpoints.lg ?? slidesPerView,
                    mousewheel: { enabled: false },
                    grabCursor: false,
                },
            },
            modules: [modules_1.Navigation, modules_1.Autoplay, modules_1.Pagination],
        });
    });
}
//# sourceMappingURL=swiper.js.map