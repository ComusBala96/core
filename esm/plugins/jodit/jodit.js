import { Config } from '../../app';
export async function jodit(op) {
    if (typeof op === 'boolean') {
        op = {};
    }
    // @ts-ignore
    const [{ Jodit }] = await Promise.all([import('jodit'), import('jodit/es5/jodit.min.css'), import('jodit/esm/plugins/all.js')]);
    const { element = '', height = '', placeholder = '', removeButtons = [] } = op;
    const fontFamily = Config.locale === 'bn' ? 'SolaimanLipi' : 'Roboto';
    const editor = Jodit.make(`.${element}`, {
        readonly: false,
        width: '100%',
        height,
        placeholder,
        style: {
            background: 'rgba(209, 213, 219, 0.2)',
            fontSize: '18px',
            fontFamily,
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
    editor.events.on('afterInit', function () {
        if (editor.value === '<p><br></p>') {
            editor.value = '';
        }
    });
    if (editor?.editor) {
        editor.editor.style.fontFamily = fontFamily;
    }
    return editor;
}
//# sourceMappingURL=jodit.js.map