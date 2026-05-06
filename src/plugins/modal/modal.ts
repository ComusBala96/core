import { Config } from '../../app';
import { Http } from '../../http';
import { AppConfig } from '../../types';
import { Sweet } from '../../utils';

/* --------------------------------
Modal Loader
-------------------------------- */
export function actionModal(op: AppConfig = {}): void {
    const { element = 'NA', script = '/', payload = {}, title = 'No title provided' } = op;
    /* loading UI */
    $('.modal-body').html(`
        <div class="w-full flex justify-center items-center">
            <img src="${Config.app_url + Config.paths.loader}" 
            style="width:20px;height:20px;"> Loading...
        </div>
    `);

    Http.ajax.make({
        ...op,
        element,
        script,
        payload,
        dataType: 'json',
        type: 'request',
        target: element,
        title,
        noLoaderImg: true,
        success: (op: AppConfig) => {
            const type = typeof op;
            if (Config.app_env) {
                console.log(op);
            }
            if (type === 'object') {
                const { response, title, modalCallback = undefined, globLoader = true } = op;
                if (response.success) {
                    const { data, view = 'reached' } = response.data;
                    if (globLoader) {
                        Sweet.success({ html: data?.alert });
                    }
                    $('.modal-title').html(title);
                    $('.modal-body').html(view);
                    if (modalCallback) {
                        if (window[modalCallback]) {
                            (window as any)[modalCallback](response);
                        }
                    }
                }
            } else {
                $('#theGlobalLoader').removeClass('activeGlobalLoader').css({ display: 'none' });
            }
        },
    });
}
