import { Http } from '../http';
import { validate } from '../plugins';
import { AppConfig } from '../types';
import { Obj } from '../utils';
import { App } from './app';

export class Ajax extends App {
    static make(op: AppConfig): Ajax {
        Http.ajax.make(op, this.successHandler);

        return this;
    }

    static get<T extends typeof Ajax>(this: T, op: AppConfig): T {
        const { method = 'GET' } = op;

        Http.ajax.make(Obj.merge(op, { method }), this.successHandler);

        return this;
    }

    static post<T extends typeof Ajax>(this: T, op: AppConfig): T {
        const { method = 'POST', validation } = op;
        if (validation) {
            validate(op, this.successHandler);
        }
        Http.ajax.make(Obj.merge(op, { method }), this.successHandler);

        return this;
    }

    static put<T extends typeof Ajax>(this: T, op: AppConfig): T {
        const { method = 'PUT', confirm = true } = op;
        Http.ajax.make(Obj.merge(op, { method, confirm }), this.successHandler);

        return this;
    }

    static delete<T extends typeof Ajax>(this: T, op: AppConfig): T {
        const { method = 'DELETE', confirm = true } = op;

        Http.ajax.make(Obj.merge(op, { method, confirm }), this.successHandler);

        return this;
    }
}
