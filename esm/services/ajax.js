import { Lang } from '../app';
import { Http } from '../http';
import { validate } from '../resources';
import { Form, Guard, Obj, Sweet } from '../utils';
import { App } from './app';
export class Ajax {
    static make(op) {
        const { element, type = 'submit' } = op;
        switch (type) {
            case 'submit':
                $(`#${element}`).on('submit', function (e) {
                    e.preventDefault();
                    const form = $(this)[0];
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
    static get(op) {
        const { method = 'GET' } = op;
        Http.ajax.send(Obj.merge(op, { method }), App.successHandler);
        return;
    }
    static post(op) {
        const { element, validation, method = 'POST', dataType = 'form' } = op;
        if (!Guard.hasInternet()) {
            Sweet.tost.error({ text: Lang.sweet.error.no_internet, timer: 300, position: 'center' });
            return;
        }
        if (validation) {
            validate(op, App.successHandler);
            return;
        }
        if (dataType.toLocaleLowerCase() === 'form') {
            $(`#${element}`).on('submit', function (e) {
                e.preventDefault();
                op.payload = Form.getData({ ...op, form: $(this)[0] });
                Http.ajax.send(Obj.merge(op, { method: method.toUpperCase() }), App.successHandler);
            });
            return;
        }
        else {
            Http.ajax.send(Obj.merge(op, { method: method.toUpperCase(), payload: { ...op.payload, ...Form.getData(op) } }), App.successHandler);
        }
        return;
    }
    static put(op) {
        const { method = 'PUT', confirm = true } = op;
        Http.ajax.send(Obj.merge(op, { method, confirm }), App.successHandler);
        return;
    }
    static delete(op) {
        const { method = 'DELETE', confirm = true } = op;
        Http.ajax.send(Obj.merge(op, { method, confirm }), App.successHandler);
        return;
    }
}
//# sourceMappingURL=ajax.js.map