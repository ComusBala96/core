import { appendBody, mouseEvent } from '../../helpers/tooltip';

export class Tooltip {
    public static $tooltip: JQuery<HTMLElement>;
    private static create(): void {
        appendBody();
        this.$tooltip = $('#app-tooltip');
    }

    static enable(selector = '[data-tooltip]'): void {
        this.create();
        mouseEvent(selector);
    }

    static disable(): void {
        $(document).off('.app-tooltip');
        this.$tooltip?.hide();
    }
}
