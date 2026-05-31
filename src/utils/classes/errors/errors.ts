import { bigErrors, noServer, validateErrors } from "../../helpers";


export class Error {
    static noServer(): void {
        return noServer();
    }
    static validateErrors(errors: Record<string, string[]>): void {
        return validateErrors(errors);
    }
    static bigErrors(res: Record<string, string[]>): void {
        return bigErrors(res);
    }
}

