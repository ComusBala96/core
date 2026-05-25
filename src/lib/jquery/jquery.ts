import jQuery from 'jquery';

declare global {
    interface Window {
        $: typeof jQuery;
        jQuery: typeof jQuery;
    }
}

const $ = jQuery;

if (typeof window !== 'undefined') {
    window.$ = $;
    window.jQuery = $;
}

export default $;
export { $ };