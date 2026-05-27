import { Config } from '../../../app';
import { AppConfig } from '../../../types';
import { getElementById } from './dom';


export function getFormData(op: AppConfig): FormData | Record<string, any> {
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
            const data: FormData = new FormData(form);
            if (csrf_token && locale) {
                data.append('_token', csrf_token);
                data.append('client', client);
                data.append('lang', locale);
                return data;
            }
        }
        return fallback;
    } catch (error) {
        console.error('[getFormData] Failed to build payload:', error);
        return fallback;
    }
}

export function resetForm(formId: string) {
    const form = getElementById(formId).get(0) as HTMLFormElement;
    if (form) form.reset();
}
