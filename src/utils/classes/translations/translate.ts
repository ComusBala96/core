import { trans_number } from '../../helpers';

export class Trans {
    static number(input: number | string): string | number {
        return trans_number(input);
    }
}
