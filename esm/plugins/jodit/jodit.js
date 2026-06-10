import { Config } from '../../app';
export async function jodit(op) {
    if (typeof op === 'boolean') {
        op = {};
    }
    const [{ Jodit }] = await Promise.all([import('jodit'), import('jodit/esm/plugins/all.js')]);
    const { element = 'none', height = 300, placeholder = 'Write your content', removeButtons = [] } = op;
    if (Config.app_env) {
        console.log('Jodit Options:', { element, height, placeholder, removeButtons });
    }
    const fontFamily = Config.locale === 'bn' ? 'SolaimanLipi' : 'Roboto';
    const elements = Array.isArray(element) ? element : [element];
    const editors = elements.map((el, index) => {
        const editor = Jodit.make(`.${el}`, {
            readonly: false,
            width: '100%',
            height: Array.isArray(height) ? (height[index] ?? '') : height,
            placeholder: Array.isArray(placeholder) ? (placeholder[index] ?? '') : placeholder,
            style: {
                background: 'rgba(209, 213, 219, 0.2)',
                fontSize: '18px',
                fontFamily: fontFamily,
            },
            // @ts-ignore
            defaultMode: Jodit.MODE_WYSIWYG,
            language: Config.locale,
            toolbarAdaptive: false,
            uploader: {
                insertImageAsBase64URI: true,
            },
            image: {
                editSrc: true,
                // @ts-ignore
                width: '300px',
                useImageEditor: true,
            },
            removeButtons: ['speechRecognize', 'file', ...removeButtons],
        });
        editor.events.on('afterInit', () => {
            if (editor.value === '<p><br></p>') {
                editor.value = '';
            }
        });
        if (editor.editor) {
            editor.editor.style.fontFamily = fontFamily;
        }
        return editor;
    });
    return editors.length === 1 ? editors[0] : editors;
}
//# sourceMappingURL=jodit.js.map