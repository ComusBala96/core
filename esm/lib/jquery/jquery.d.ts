import jQuery from 'jquery';
declare global {
    interface Window {
        $: typeof jQuery;
        jQuery: typeof jQuery;
    }
}
declare const $: JQueryStatic;
export default $;
export { $ };
//# sourceMappingURL=jquery.d.ts.map