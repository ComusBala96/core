import * as LangModules from '../../locale/index';
import { Dom, Str } from '../../utils';
import { Config } from '../config/config';
import { LangOptions } from '../../types';

export class Lang {
    /**
     * Join locale and module name to form export key
     * params: path - module path relative to locale folder
     * Example: "auth" => "en/auth" || "bn/auth"
     * return: "en/auth" || "bn/auth" or throw error if invalid
     */
    private static joinLocale(path: string): string {
        if (!path) {
            throw new Error('Invalid lang path.');
        }
        return (Config.locale + '/' + path) as string;
    }
    /**
     * Join locale and module name to form export key
     * params: path - module path relative to locale folder
     * Example: "auth" => "en/auth"
     * return: "en_auth" || "bn_auth" or throw error if invalid
     */
    private static getModuleKey(path: string): string {
        if (!path) {
            throw new Error('Invalid lang path.');
        }
        const key = Str.makeExportName(this.joinLocale(String(path))) as keyof typeof LangModules;
        return key;
    }

    /**
     * Read language key from element id
     * params: id - DOM element ID
     * Example: <input id="auth" value="auth" />
     * val: "auth" or throw error if value is empty or invalid
     * return: "en_auth" || "bn_auth" or throw error if invalid
     */
    static getLangKey(id: string): string {
        const val = Dom.getElementById(id).val();
        if (!val || typeof val !== 'string' || val.trim() === '') {
            throw new Error(`Value not found in #${id}.`);
        }
        const key = this.getModuleKey(val) as keyof typeof LangModules;
        if (!key) {
            throw new Error(`Invalid lang key in #${id}.`);
        }
        return key;
    }

    /**
     * Get lang module directly by path
     * params: path - module path relative to locale folder
     * Example: "path" => "auth"; key => "en_auth" || "bn_auth"; data => { ... };
     * return: lang module object or throw error if not found
     */
    static get(path: string): Record<string, any> {
        const key = this.getModuleKey(path) as keyof typeof LangModules;
        const data = LangModules[key];
        if (!data) {
            throw new Error(`Lang module "${key}" not found.`);
        }
        return data as Record<string, any>;
    }

    /**
     * Get lang module from DOM element value
     * params: id - element id relative to locale folder
     * Example: "id" => "pageLang" => key => "en_site_home_home" || "bn_site_home_home" => data => { ... }
     * return: lang module object or throw error if not found
     */
    static getLangById(id: string): Record<string, any> {
        const key = this.getLangKey(id) as keyof typeof LangModules;
        const data = LangModules[key];
        if (!data) {
            throw new Error(`Lang module "${key}" not found.`);
        }
        return data as Record<string, any>;
    }

    /**
     * Common predefined getters
     * return: lang module object or throw error if not found
     */
    static get pageLang(): Record<string, any> {
        //@ts-ignore
        return this.get(typeof window !== 'undefined' ? (window.pageLang ?? this.getLangKey('pageLang')) : this.getLangKey('pageLang'));
    }
    static get alerts(): Record<string, any> {
        return this.get('alerts');
    }
    static get sweet(): Record<string, any> {
        return this.alerts.sweet;
    }
    static get attributes(): Record<string, any> {
        return this.get('attributes');
    }
    static get auth(): Record<string, any> {
        return this.get('auth');
    }
    static get buttons(): Record<string, any> {
        return this.get('buttons');
    }

    static get common(): Record<string, any> {
        return this.get('common');
    }

    static get datatable(): Record<string, any> {
        return this.get('datatable');
    }
    static get digits(): Record<string, any> {
        return this.get('digits');
    }
    static get dropdown(): Record<string, any> {
        return this.get('dropdown');
    }
    static get errors(): Record<string, any> {
        return this.get('errors');
    }
    static get pagination(): Record<string, any> {
        return this.get('pagination');
    }
    
    static get passwords(): Record<string, any> {
        return this.get('passwords');
    }
    
    static get sidebar(): Record<string, any> {
        return this.get('sidebar');
    }
    
    static get validation(): Record<string, any> {
        return this.get('validation');
    }
    /**
     * Find lang module and nested parts from dot notation path
     * param: path - dot notation path to translation key (e.g. "validation.required")
     * return: Object containing moduleKey (e.g. "en_validation") and nestedParts (e.g. ["required"]) or null if not found
     */
    private static findModule(path: string): { moduleKey: keyof typeof LangModules | null; nestedParts: string[] } {
        const parts = path.split('.');
        const keys = Object.keys(LangModules);
        const localePrefix = `${Config.locale}_`;

        for (let i = parts.length; i > 0; i--) {
            const candidate = localePrefix + parts.slice(0, i).join('_');

            if (keys.includes(candidate)) {
                return {
                    moduleKey: candidate as keyof typeof LangModules,
                    nestedParts: parts.slice(i),
                };
            }
        }

        return {
            moduleKey: null,
            nestedParts: [],
        };
    }
    /**
     * Resolve nested translation by dot notation
     * params: path - dot notation path to translation key; source - optional object to resolve from (defaults to module)
     * Example: this.resolve('validation.required')
     * return: translation value or null if not found
     */
    static resolve(path: string, source?: Record<string, any>): any {
        if (!path || typeof path !== 'string') return null;
        const { moduleKey, nestedParts } = this.findModule(path);
        if (!moduleKey) {
            console.error(`Lang module for path "${path}" not found.`);
            return null;
        }
        let current: any = source ?? LangModules[moduleKey];
        for (const part of nestedParts) {
            if (current && typeof current === 'object' && Object.prototype.hasOwnProperty.call(current, part)) {
                current = current[part];
            } else {
                console.error(`Translation key "${part}" not found in module "${moduleKey}".`);
                return null;
            }
        }
        return current;
    }

    /**
     * Check if translation exists
     * params: path - dot notation path to translation key; source - optional object to check in (defaults to module)
     * Example: this.has('validation.required')
     * return: true if translation exists, false otherwise
     */
    static has(path: string, source?: Record<string, any>): boolean {
        return this.resolve(path, source) !== null ? true : false;
    }

    /**
     * Translate by dot path
     * params: path - dot notation path to translation key; replace - optional replacement values; customMessage - optional custom message if translation not found
     * Example: this.trans('auth.failed')
     * return: translated string or custom message if not found
     */
    static trans(path: string, replace?: string | number | Record<string, string | number>, customMessage?: string): string {
        const val = this.resolve(path);
        if (typeof val !== 'string') {
            return customMessage || path;
        }
        return this.replace(val, replace);
    }

    /**
     * Replace :key placeholders
     * params: text - text with :key placeholders; replace - replacement value(s) (string/number for all or object for specific keys)
     * Example: "Hello :app_name"
     * replace: "Hello :app_name" => "Hello MyApp"
     */
    static replace(text: string, replace?: string | number | Record<string, string | number>): string {
        if (typeof text !== 'string') return '';
        // No replacements passed
        if (replace === undefined || replace === null) {
            return text;
        }
        // Primitive replacement
        if (typeof replace === 'string' || typeof replace === 'number') {
            return text.replace(/:\w+/g, String(replace));
        }
        // Object replacement
        return text.replace(/:(\w+)/g, (match, key) => {
            return key in replace ? String(replace[key]) : match;
        });
    }
    /**
     * Get all lang modules for current locale
     * param: none
     * Example: if locale is 'en', returns all modules with 'en_' prefix like { en_auth: { ... }, en_validation: { ... }, ... }
     * return: Object containing all lang modules for current locale or empty object if none found
     */
    static get all(): Record<string, any> {
        const all: Record<string, any> = {};
        for (const key in LangModules) {
            if (Object.prototype.hasOwnProperty.call(LangModules, key)) {
                if (key.startsWith(Config.locale + '_')) {
                    all[key] = LangModules[key as keyof typeof LangModules];
                }
            }
        }
        return all;
    }

    static getLangBags(op: LangOptions = {}) {
        const obj: Record<string, string> = {};
        const lang = this.validation;
        for (const langKey in lang) {
            const langElement = lang[langKey];
            if (typeof langElement === 'object') {
                for (const key in langElement) {
                    const element = String(langElement[key]);
                    obj[key] = this.getMatchedString(element, op);
                }
            } else if (typeof langElement === 'string') {
                obj[langKey] = this.getMatchedString(langElement, op);
            }
        }
        return obj;
    }
    static getMatchedString(element: string, op: LangOptions) {
        return element.replace(/:digits|:type|:attribute/gi, (matched) => {
            const key = matched.split(':')[1];
            const value = op[key];

            return value === undefined ? matched : String(value);
        });
    }
    static isEmptyObject(obj: object) {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                return false;
            }
        }
        return true;
    }
}
