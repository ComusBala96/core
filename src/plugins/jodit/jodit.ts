import type { Jodit } from 'jodit';
import { JoditOptions } from '../../types';
import { Config } from '../../app';
import { ButtonsOption } from 'jodit/types/types';

export async function jodit(op: JoditOptions | boolean): Promise<Jodit | Jodit[]> {
    if (typeof op === 'boolean') {
        op = {};
    }
    const [{ Jodit }] = await Promise.all([import('jodit'), import('jodit/esm/plugins/all.js')]);
    const { element = 'none', height = 300, placeholder = 'Write your content', removeButtons = [], buttons = [] } = op;
    if (Config.app_env) {
        console.log('Jodit Options:', op);
    }
    const fontFamily = Config.locale === 'bn' ? 'SolaimanLipi' : 'Roboto';
    const elements = Array.isArray(element) ? element : [element];
    const editors = elements.map((el, index) => {
        const defaultButtons = ['bold', 'italic', 'underline', 'fontsize', 'ul', 'ol', 'table', 'link', 'preview', 'source'];
        let buttonsConfig: ButtonsOption;
        try {
            if (buttons === undefined || buttons === null) {
                // No buttons option provided
                buttonsConfig = defaultButtons;
            } else {
                const currentButtons = Array.isArray(buttons?.[0]) ? ((buttons as string[][])[index] ?? []) : (buttons as string[]);
                buttonsConfig = [...new Set([...defaultButtons, ...currentButtons])];
            }
        } catch {
            buttonsConfig = Jodit.defaultOptions.buttons;
        }
        const currentRemoveButtons = Array.isArray(removeButtons?.[0]) ? ((removeButtons as string[][])[index] ?? []) : ((removeButtons as string[]) ?? []);
        const editor = Jodit.make(`.${el}`, {
            readonly: false,
            width: '100%',
            height: Array.isArray(height) ? (height[index] ?? '') : height,
            placeholder: Array.isArray(placeholder) ? (placeholder[index] ?? '') : placeholder,
            style: {
                background: 'rgba(209, 213, 219, 0.2)',
                fontSize: '14px',
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
            buttons: buttonsConfig,
            removeButtons: ['speechRecognize', 'file', ...currentRemoveButtons],
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
