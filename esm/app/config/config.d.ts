import { UpdateCols } from '../../types';
export declare class Config {
    /**
     * Get all config data from hidden input;
     * param: none;
     * Example: <input type="hidden" id="config" value="{...}" /> or window.config = {...};
     * return: config object or throw error if not found;
     */
    static get all(): Record<string, any>;
    /**
     * Parse config value from string or object to object
     * param: raw - config value in string or object format
     * Example: '{"key":"value"}' or { key: 'value' }
     * return: config object or throw error if invalid
     */
    private static parseConfig;
    /**
     * Get application locale from meta tag or config object or environment variable;
     * param: none;
     * Example: <meta name="app_locale" content="en" /> or VITE_APP_LOCALE='en' in .env or config/core.php config file app_locale key;
     * return: locale string en | bn or throw error if not found;
     */
    static get locale(): string;
    /**
     * Get csrf_token from meta tag;
     * param: none;
     * Example: <meta name="_token" content="csrf_token_value" />
     * return: csrf token string or throw error if not found;
     */
    static get csrf_token(): string;
    /**
     * Get the application env
     * param: none
     * Example: APP_ENV=local | APP_ENV=production
     * return: boolean;
     */
    static get app_env(): boolean;
    /**
     * Get the application name
     * param: none
     * Example: "OrianSoft"
     * return: app name string or '';
     */
    static get app_name(): string;
    /**
     * Get the application address
     * param: none
     * Example: "West Bengal, India"
     * return: address string or '';
     */
    static get app_address(): string;
    /**
     * Get the application domain URL
     * param: none
     * Example: https://example.com/
     * return: domain URL like https://example.com/ string or '';
     */
    static get app_url(): string;
    /**
     * Get the application host
     * param: none
     * Example: example.com
     * return: host string like example.com or '';
     */
    static get app_host(): string;
    /**
     * Get the application version
     * param: none
     * Example: "1.0.0"
     * return: app version string or '';
     */
    static get app_version(): string;
    /**
     * Get datatable config object
     * param: none
     * Example: { dt_length: [10, 25, 50], dt_size: 10 }
     * return: datatable config object or {};
     */
    static get datatable(): Record<string, any>;
    /**
     * Get datatable length options
     * param: none
     * Example: [10, 25, 50]
     * return: array of length options or [];
     */
    static get dt_length(): string[];
    /**
     * Get datatable default size
     * param: none
     * Example: 10
     * return: default size number or '';
     */
    static get dt_size(): number;
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
    static dt_update_cols: UpdateCols;
    /**
     * Get media config object
     * param: none
     * Example: { image: {...}, video: {...}, file: {...} }
     * return: media config object or {};
     */
    static get media(): Record<string, any>;
    /**
     * Get image media config
     * param: none
     * Example: { accepts: ['image/jpeg', 'image/png'], 'size': { profile: [{ width: 180, height: 180 }], cover: [{ width: 1024, height: 360 }],
        post: [ { width: 630, height: 240 }, { width: 1024, height: 390 }, { width: 1920, height: 730 }, ],
        ads: [ { width: 630, height: 120 }, { width: 768, height: 144 }, { width: 1400, height: 240 },],}; }
     * return: image media config object or {};
     */
    static get image(): Record<string, any>;
    /**
     * Get video media config
     * param: none
     * Example: { accepts: [ "video/mp4" ], }
     * return: video media config object or {};
     */
    static get video(): Record<string, any>;
    /**
     * Get file media config
     * param: none
     * Example: { accepts: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'], format: ['pdf', 'doc', 'docx'] }
     * return: file media config object or {};
     */
    static get file(): Record<string, any>;
    /**
     * Get meta image config
     * param: none
     * Example: { {404: 'statics/images/404.png', favicon: 'favicon.ico', logo: 'logo.png', logo_dark: 'logo-dark.png', auth: 'statics/images/auth.png', loader: 'statics/images/loader.gif', …} }
     * return: meta image config object or {};
     */
    static get meta_image(): Record<string, any>;
    /**
     * Get old paths config for backward compatibility
     * param: none
     * Example: {block: 'statics/images/block/images/'}
     * return: old paths config object or {};
     */
    static get old_paths(): Record<string, any>;
    /**
     * Get paths config for new structure
     * param: none
     * Example: {root: 'storage/uploads/', summernote: 'storage/uploads/summernote/', jodit: 'storage/uploads/jodit/', logo: 'storage/uploads/logo/', user: 'storage/uploads/user/', …}
     * return: paths config object or {};
     */
    static get paths(): Record<string, any>;
}
//# sourceMappingURL=config.d.ts.map