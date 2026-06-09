import { Config } from '../../../app';
import { getElementById } from './dom';
export function getFormData(op) {
    const { form = null, payload = {} } = op;
    const csrf_token = Config.csrf_token;
    const client = 'w';
    const locale = Config.locale;
    const fallback = {
        ...payload,
        _token: csrf_token,
        client: client,
        lang: locale,
    };
    try {
        if (form) {
            const data = new FormData(form);
            if (csrf_token && locale) {
                data.append('_token', csrf_token);
                data.append('client', client);
                data.append('lang', locale);
                return data;
            }
        }
        return fallback;
    }
    catch (error) {
        console.error('[getFormData] Failed to build payload:', error);
        return fallback;
    }
}
export function resetForm(formId) {
    const form = getElementById(formId).get(0);
    if (Config.app_env) {
        console.log('Form:', form);
    }
    if (form)
        form.reset();
}
//# sourceMappingURL=form.js.map