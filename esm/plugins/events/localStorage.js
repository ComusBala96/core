export const loadLocalStorage = () => {
    const colorTheme = localStorage.getItem('color-theme');
    const theme = colorTheme === 'dark' ? 'dark' : 'light';
    setStorage('color-theme', theme);
};
function setStorage(key, value) {
    $(window).on('load', () => {
        localStorage.setItem(key, value);
    });
}
//# sourceMappingURL=localStorage.js.map