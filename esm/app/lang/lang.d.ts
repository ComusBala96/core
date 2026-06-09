import { LangOptions } from '../../types';
export declare class Lang {
    /**
     * Join locale and module name to form export key
     * params: path - module path relative to locale folder
     * Example: "auth" => "en/auth" || "bn/auth"
     * return: "en/auth" || "bn/auth" or throw error if invalid
     */
    private static joinLocale;
    /**
     * Join locale and module name to form export key
     * params: path - module path relative to locale folder
     * Example: "auth" => "en/auth"
     * return: "en_auth" || "bn_auth" or throw error if invalid
     */
    private static getModuleKey;
    /**
     * Read language key from element id
     * params: id - DOM element ID
     * Example: <input id="auth" value="auth" />
     * val: "auth" or throw error if value is empty or invalid
     * return: "en_auth" || "bn_auth" or throw error if invalid
     */
    static getLangKey(id: string): string;
    /**
     * Get lang module directly by path
     * params: path - module path relative to locale folder
     * Example: "path" => "auth"; key => "en_auth" || "bn_auth"; data => { ... };
     * return: lang module object or throw error if not found
     */
    static get(path: string): Record<string, any>;
    /**
     * Get lang module from DOM element value
     * params: id - element id relative to locale folder
     * Example: "id" => "pageLang" => key => "en_site_home_home" || "bn_site_home_home" => data => { ... }
     * return: lang module object or throw error if not found
     */
    static getLangById(id: string): Record<string, any>;
    /**
     * Common predefined getters
     * return: lang module object or throw error if not found
     */
    static get pageLang(): Record<string, any>;
    static get alerts(): Record<string, any>;
    static get sweet(): Record<string, any>;
    static get attributes(): Record<string, any>;
    static get auth(): Record<string, any>;
    static get buttons(): Record<string, any>;
    static get common(): Record<string, any>;
    static get datatable(): Record<string, any>;
    static get digits(): Record<string, any>;
    static get dropdown(): Record<string, any>;
    static get errors(): Record<string, any>;
    static get pagination(): Record<string, any>;
    static get passwords(): Record<string, any>;
    static get sidebar(): Record<string, any>;
    static get validation(): Record<string, any>;
    /**
     * Find lang module and nested parts from dot notation path
     * param: path - dot notation path to translation key (e.g. "validation.required")
     * return: Object containing moduleKey (e.g. "en_validation") and nestedParts (e.g. ["required"]) or null if not found
     */
    private static findModule;
    /**
     * Resolve nested translation by dot notation
     * params: path - dot notation path to translation key; source - optional object to resolve from (defaults to module)
     * Example: this.resolve('validation.required')
     * return: translation value or null if not found
     */
    static resolve(path: string, source?: Record<string, any>): any;
    /**
     * Check if translation exists
     * params: path - dot notation path to translation key; source - optional object to check in (defaults to module)
     * Example: this.has('validation.required')
     * return: true if translation exists, false otherwise
     */
    static has(path: string, source?: Record<string, any>): boolean;
    /**
     * Translate by dot path
     * params: path - dot notation path to translation key; replace - optional replacement values; customMessage - optional custom message if translation not found
     * Example: this.trans('auth.failed')
     * return: translated string or custom message if not found
     */
    static trans(path: string, replace?: string | number | Record<string, string | number>, customMessage?: string): string;
    /**
     * Replace :key placeholders
     * params: text - text with :key placeholders; replace - replacement value(s) (string/number for all or object for specific keys)
     * Example: "Hello :app_name"
     * replace: "Hello :app_name" => "Hello MyApp"
     */
    static replace(text: string, replace?: string | number | Record<string, string | number>): string;
    /**
     * Get all lang modules for current locale
     * param: none
     * Example: if locale is 'en', returns all modules with 'en_' prefix like { en_auth: { ... }, en_validation: { ... }, ... }
     * return: Object containing all lang modules for current locale or empty object if none found
     */
    static get all(): Record<string, any>;
    static getLangBags(op?: LangOptions): Record<string, string>;
    static getMatchedString(element: string, op: LangOptions): string;
    static isEmptyObject(obj: object): boolean;
}
//# sourceMappingURL=lang.d.ts.map