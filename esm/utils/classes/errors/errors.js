import { bigErrors, noServer, validateErrors } from "../../helpers";
export class Error {
    static noServer() {
        return noServer();
    }
    static validateErrors(errors) {
        return validateErrors(errors);
    }
    static bigErrors(res) {
        return bigErrors(res);
    }
}
//# sourceMappingURL=errors.js.map