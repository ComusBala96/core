"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLocalStorage = void 0;
const loadLocalStorage = () => {
    const colorTheme = localStorage.getItem('color-theme');
    const theme = colorTheme === 'dark' ? 'dark' : 'light';
    setStorage('color-theme', theme);
};
exports.loadLocalStorage = loadLocalStorage;
function setStorage(key, value) {
    $(window).on('load', () => {
        localStorage.setItem(key, value);
    });
}
//# sourceMappingURL=localStorage.js.map