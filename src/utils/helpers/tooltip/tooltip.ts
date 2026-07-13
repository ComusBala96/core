import { Tooltip } from "../../classes";


export function appendBody() {
    if (!$('#app-tooltip').length) {
        $('body').append(`
                <div id="app-tooltip"
                    style="
                        position: fixed;
                        display: none;
                        max-width: 300px;
                        padding: 8px 12px;
                        background: #1f2937;
                        color: #fff;
                        border-radius: 6px;
                        font-size: 13px;
                        line-height: 1.5;
                        z-index: 99999;
                        pointer-events: none;
                        white-space: normal;
                        box-shadow: 0 4px 10px rgba(0,0,0,.2);
                    ">
                </div>
            `);
    }
}

export function mouseEvent(selector: string) {
    $(document)
        .off('.app-tooltip')
        .on('mouseenter.app-tooltip', selector, (e) => {
            const $target = $(e.currentTarget);
            const content = $target.data('tooltip');
            if (!content) return;
            Tooltip.$tooltip.html(content).show();
        })
        .on('mousemove.app-tooltip', selector, (e) => {
            Tooltip.$tooltip.css({
                top: e.clientY + 15,
                left: e.clientX + 15,
            });
        })
        .on('mouseleave.app-tooltip', selector, () => {
            Tooltip.$tooltip.hide();
        });
}
