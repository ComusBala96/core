import { current } from '../../helpers';

export class Url {
    static current(path?: string): string {
        return current(path);
    }
}
