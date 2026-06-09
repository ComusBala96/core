"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadBounceOnceAnimation = loadBounceOnceAnimation;
function loadBounceOnceAnimation() {
    const $window = $(window);
    $window.on('load scroll', () => {
        const windowBottom = $window.scrollTop() + $window.height();
        $('.bounce-once').each(function () {
            const $el = $(this);
            const elementTop = $el.offset()?.top ?? 0;
            if (elementTop < windowBottom - 150) {
                $el.addClass('animate-bounce-once');
            }
            else {
                $el.removeClass('animate-bounce-once');
            }
        });
    });
}
//# sourceMappingURL=animation.js.map