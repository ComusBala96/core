import { Lang } from '../app';
import { Http } from '../http';
import { validate } from '../resources';
import { AppConfig } from '../types';
import { Form, Guard, Obj, Sweet } from '../utils';
import { App } from './app';

export class Ajax {
    static make<T extends typeof Ajax>(this: T, op: AppConfig): void {
        const { element, type = 'submit' } = op;
        switch (type) {
            case 'submit':
                $(`#${element}`).on('submit', function (this: HTMLElement, e: JQuery.SubmitEvent) {
                    e.preventDefault();
                    const form = $(this)[0] as HTMLFormElement;
                    const formData = Form.getData({ ...op, form });
                    if (Guard.hasInternet()) {
                        op.payload = formData;
                        Http.ajax.send(op, App.successHandler);
                    }
                });
                break;
            case 'request':
                if (Guard.hasInternet()) {
                    Http.ajax.send(op, App.successHandler);
                }
                break;
            default:
                return;
        }
        return;
    }

    static get<T extends typeof Ajax>(this: T, op: AppConfig): void {
        const { method = 'GET' } = op;
        Http.ajax.send(Obj.merge(op, { method }), App.successHandler);
        return;
    }

    static post<T extends typeof Ajax>(this: T, op: AppConfig): void {
        const { element, validation, method = 'POST', dataType = 'form' } = op;
        if (!Guard.hasInternet()) {
            Sweet.tost.error({ text: Lang.sweet.error.no_internet, timer: 300, position: 'center' });
            return;
        }
        if (validation) {
            App.validator = validate(op, App.successHandler);
            return;
        }
        if (dataType.toLocaleLowerCase() === 'form') {
            $(`#${element}`).on('submit', function (this: HTMLElement, e: JQuery.SubmitEvent) {
                e.preventDefault();
                op.payload = Form.getData({ ...op, form: $(this)[0] as HTMLFormElement });
                Http.ajax.send(Obj.merge(op, { method: method.toUpperCase() }), App.successHandler);
            });
            return;
        } else {
            Http.ajax.send(Obj.merge(op, { method: method.toUpperCase(), payload: { ...op.payload, ...Form.getData(op) } }), App.successHandler);
        }
        return;
    }

    static put<T extends typeof Ajax>(this: T, op: AppConfig): void {
        const { method = 'PUT', confirm = true } = op;
        Http.ajax.send(Obj.merge(op, { method, confirm }), App.successHandler);

        return;
    }

    static delete<T extends typeof Ajax>(this: T, op: AppConfig): void {
        const { method = 'DELETE', confirm = true } = op;

        Http.ajax.send(Obj.merge(op, { method, confirm }), App.successHandler);

        return;
    }
}
