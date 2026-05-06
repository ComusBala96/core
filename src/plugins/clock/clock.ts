/**
 * Clock functions definitions.
 */

import {  liveClock } from '../../utils';

export class Clock {
    static liveClock(selector: string): void {
        liveClock(selector);
    }
}
