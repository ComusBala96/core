"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ajax = void 0;
const app_1 = require("../app");
const http_1 = require("../http");
const resources_1 = require("../resources");
const utils_1 = require("../utils");
const app_2 = require("./app");
class Ajax {
    static make(op) {
        const { element, type = 'submit' } = op;
        switch (type) {
            case 'submit':
                $(`#${element}`).on('submit', function (e) {
                    e.preventDefault();
                    const form = $(this)[0];
                    const formData = utils_1.Form.getData({ ...op, form });
                    if (utils_1.Guard.hasInternet()) {
                        op.payload = formData;
                        http_1.Http.ajax.send(op, app_2.App.successHandler);
                    }
                });
                break;
            case 'request':
                if (utils_1.Guard.hasInternet()) {
                    http_1.Http.ajax.send(op, app_2.App.successHandler);
                }
                break;
            default:
                return;
        }
        return;
    }
    static get(op) {
        const { method = 'GET' } = op;
        http_1.Http.ajax.send(utils_1.Obj.merge(op, { method }), app_2.App.successHandler);
        return;
    }
    static post(op) {
        const { element, validation, method = 'POST', dataType = 'form' } = op;
        if (!utils_1.Guard.hasInternet()) {
            utils_1.Sweet.tost.error({ text: app_1.Lang.sweet.error.no_internet, timer: 300, position: 'center' });
            return;
        }
        if (validation) {
            (0, resources_1.validate)(op, app_2.App.successHandler);
            return;
        }
        if (dataType.toLocaleLowerCase() === 'form') {
            $(`#${element}`).on('submit', function (e) {
                e.preventDefault();
                op.payload = utils_1.Form.getData({ ...op, form: $(this)[0] });
                http_1.Http.ajax.send(utils_1.Obj.merge(op, { method: method.toUpperCase() }), app_2.App.successHandler);
            });
            return;
        }
        else {
            http_1.Http.ajax.send(utils_1.Obj.merge(op, { method: method.toUpperCase(), payload: { ...op.payload, ...utils_1.Form.getData(op) } }), app_2.App.successHandler);
        }
        return;
    }
    static put(op) {
        const { method = 'PUT', confirm = true } = op;
        http_1.Http.ajax.send(utils_1.Obj.merge(op, { method, confirm }), app_2.App.successHandler);
        return;
    }
    static delete(op) {
        const { method = 'DELETE', confirm = true } = op;
        http_1.Http.ajax.send(utils_1.Obj.merge(op, { method, confirm }), app_2.App.successHandler);
        return;
    }
}
exports.Ajax = Ajax;
//# sourceMappingURL=ajax.js.map