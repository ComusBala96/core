import { Dom, Obj } from '../../utils';
export class Config {
    /**
     * Get all config data from hidden input;
     * param: none;
     * Example: <input type="hidden" id="config" value="{...}" /> or window.config = {...};
     * return: config object or throw error if not found;
     */
    static get all() {
        //@ts-ignore
        if (typeof window !== 'undefined' && window.config !== undefined) {
            //@ts-ignore
            const raw = window.config;
            return this.parseConfig(raw);
        }
        const el = Dom.getElementById('config');
        if (el.length) {
            const raw = el.val();
            return this.parseConfig(raw);
        }
        throw new Error('Config not found.');
    }
    /**
     * Parse config value from string or object to object
     * param: raw - config value in string or object format
     * Example: '{"key":"value"}' or { key: 'value' }
     * return: config object or throw error if invalid
     */
    static parseConfig(raw) {
        if (raw == null || raw === '') {
            throw new Error('Config value not found.');
        }
        if (typeof raw === 'object' && !Array.isArray(raw)) {
            return raw;
        }
        if (typeof raw === 'string') {
            const trimmed = raw.trim();
            if (!trimmed) {
                throw new Error('Config value is empty.');
            }
            try {
                return Obj.jsonParse(trimmed);
            }
            catch {
                throw new Error('Invalid JSON config.');
            }
        }
        throw new Error('Unsupported config format.');
    }
    /**
     * Get application locale from meta tag or config object or environment variable;
     * param: none;
     * Example: <meta name="app_locale" content="en" /> or VITE_APP_LOCALE='en' in .env or config/core.php config file app_locale key;
     * return: locale string en | bn or throw error if not found;
     */
    static get locale() {
        const el = $('meta[name="app_locale"]');
        if (el.length) {
            return el.attr('content');
        }
        //@ts-ignore
        const locale = this.all.app_locale || import.meta.env.VITE_APP_LOCALE;
        if (!locale) {
            throw new Error('Locale not found. Please define app_locale.');
        }
        return locale;
    }
    /**
     * Get csrf_token from meta tag;
     * param: none;
     * Example: <meta name="_token" content="csrf_token_value" />
     * return: csrf token string or throw error if not found;
     */
    static get csrf_token() {
        const el = $('meta[name="_token"]');
        if (el.length) {
            return el.attr('content');
        }
        throw new Error('CSRF token not found. Please define _token meta tag.');
    }
    /**
     * Get the application env
     * param: none
     * Example: APP_ENV=local | APP_ENV=production
     * return: boolean;
     */
    static get app_env() {
        // @ts-ignore
        if (this.all.app_env === 'local' || import.meta.env.VITE_APP_ENV === 'local') {
            return true;
        }
        return false;
    }
    /**
     * Get the application name
     * param: none
     * Example: "OrianSoft"
     * return: app name string or '';
     */
    static get app_name() {
        // @ts-ignore
        return this.all.app_name || import.meta.env.VITE_APP_NAME || '';
    }
    /**
     * Get the application address
     * param: none
     * Example: "West Bengal, India"
     * return: address string or '';
     */
    static get app_address() {
        // @ts-ignore
        return this.all.app_address || import.meta.env.VITE_APP_ADDRESS || '';
    }
    /**
     * Get the application domain URL
     * param: none
     * Example: https://example.com/
     * return: domain URL like https://example.com/ string or '';
     */
    static get app_url() {
        // @ts-ignore
        return this.all.app_url || import.meta.env.VITE_APP_URL || '';
    }
    /**
     * Get the application host
     * param: none
     * Example: example.com
     * return: host string like example.com or '';
     */
    static get app_host() {
        // @ts-ignore
        return this.all.app_host || import.meta.env.VITE_APP_HOST || '';
    }
    /**
     * Get the application version
     * param: none
     * Example: "1.0.0"
     * return: app version string or '';
     */
    static get app_version() {
        // @ts-ignore
        return this.all.app_version || import.meta.env.VITE_APP_VERSION || '';
    }
    /**
     * Get datatable config object
     * param: none
     * Example: { dt_length: [10, 25, 50], dt_size: 10 }
     * return: datatable config object or {};
     */
    static get datatable() {
        return this.all.datatable || {};
    }
    /**
     * Get datatable length options
     * param: none
     * Example: [10, 25, 50]
     * return: array of length options or [];
     */
    static get dt_length() {
        return this.datatable.dt_length || [];
    }
    /**
     * Get datatable default size
     * param: none
     * Example: 10
     * return: default size number or '';
     */
    static get dt_size() {
        // @ts-ignore
        return Number(this.datatable.dt_size) || Number(import.meta.env.VITE_APP_DT_SIZE) || '';
    }
    /**
     * Get media config object
     * param: none
     * Example: { image: {...}, video: {...}, file: {...} }
     * return: media config object or {};
     */
    static get media() {
        return this.all.media || {};
    }
    /**
     * Get image media config
     * param: none
     * Example: { accepts: ['image/jpeg', 'image/png'], 'size': { profile: [{ width: 180, height: 180 }], cover: [{ width: 1024, height: 360 }],
        post: [ { width: 630, height: 240 }, { width: 1024, height: 390 }, { width: 1920, height: 730 }, ],
        ads: [ { width: 630, height: 120 }, { width: 768, height: 144 }, { width: 1400, height: 240 },],}; }
     * return: image media config object or {};
     */
    static get image() {
        return this.media.image || {};
    }
    /**
     * Get video media config
     * param: none
     * Example: { accepts: [ "video/mp4" ], }
     * return: video media config object or {};
     */
    static get video() {
        return this.media.video || {};
    }
    /**
     * Get file media config
     * param: none
     * Example: { accepts: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'], format: ['pdf', 'doc', 'docx'] }
     * return: file media config object or {};
     */
    static get file() {
        return this.media.file || {};
    }
    /**
     * Get meta image config
     * param: none
     * Example: { {404: 'statics/images/404.png', favicon: 'favicon.ico', logo: 'logo.png', logo_dark: 'logo-dark.png', auth: 'statics/images/auth.png', loader: 'statics/images/loader.gif', …} }
     * return: meta image config object or {};
     */
    static get meta_image() {
        return this.all.meta_image || {};
    }
    /**
     * Get old paths config for backward compatibility
     * param: none
     * Example: {block: 'statics/images/block/images/'}
     * return: old paths config object or {};
     */
    static get old_paths() {
        return this.all.old_paths || {};
    }
    /**
     * Get paths config for new structure
     * param: none
     * Example: {root: 'storage/uploads/', summernote: 'storage/uploads/summernote/', jodit: 'storage/uploads/jodit/', logo: 'storage/uploads/logo/', user: 'storage/uploads/user/', …}
     * return: paths config object or {};
     */
    static get paths() {
        return this.all.paths || {};
    }
}
/**
 * Get datatable update columns config
 * param: none
 * return: {
    key: 'ids',
    items: [
        { index: 0, name: 'ids' },
        { index: 1, name: 'serial' },
    ],
    }
 */
Config.dt_update_cols = {
    key: 'ids',
    items: [
        { index: 1, name: 'ids' },
        { index: 1, name: 'serial' },
    ],
};
//# sourceMappingURL=config.js.map