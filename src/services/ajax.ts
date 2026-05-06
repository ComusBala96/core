import { Http } from '../http';
import { AppConfig } from '../types';
import { Obj } from '../utils';
import { App } from './app';

export class Ajax extends App {
    static make(op: AppConfig): Ajax {
        Http.ajax.make(
            op,
            this.successHandler
                ? this.successHandler
                : (op: AppConfig, res: unknown) => {
                      console.log('ajax op', op);
                      console.log('ajax response', res);
                  },
        );

        return this;
    }

    static get<T extends typeof Ajax>(this: T, op: AppConfig): T {
        const { method = 'GET' } = op;

        Http.ajax.make(
            Obj.merge(op, { method }),
            this.successHandler
                ? this.successHandler
                : (op: AppConfig, res: unknown) => {
                      console.log('ajax op', op);
                      console.log('ajax response', res);
                  },
        );

        return this;
    }

    static post<T extends typeof Ajax>(this: T, op: AppConfig): T {
        const { method = 'POST' } = op;

        Http.ajax.make(
            Obj.merge(op, { method }),
            this.successHandler
                ? this.successHandler
                : (op: AppConfig, res: unknown) => {
                      console.log('ajax op', op);
                      console.log('ajax response', res);
                  },
        );

        return this;
    }

    static put<T extends typeof Ajax>(this: T, op: AppConfig): T {
        const { method = 'PUT', confirm = true } = op;

        Http.ajax.make(
            Obj.merge(op, { method, confirm }),
            this.successHandler
                ? this.successHandler
                : (op: AppConfig, res: unknown) => {
                      console.log('ajax op', op);
                      console.log('ajax response', res);
                  },
        );

        return this;
    }

    static delete<T extends typeof Ajax>(this: T, op: AppConfig): T {
        const { method = 'DELETE', confirm = true } = op;

        Http.ajax.make(
            Obj.merge(op, { method, confirm }),
            this.successHandler
                ? this.successHandler
                : (op: AppConfig, res: unknown) => {
                      console.log('ajax op', op);
                      console.log('ajax response', res);
                  },
        );

        return this;
    }
}
