"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.jodit = jodit;
const app_1 = require("../../app");
async function jodit(op) {
    if (typeof op === 'boolean') {
        op = {};
    }
    const [{ Jodit }] = await Promise.all([Promise.resolve().then(() => __importStar(require('jodit'))), Promise.resolve().then(() => __importStar(require('jodit/esm/plugins/all.js')))]);
    const { element = 'none', height = 300, placeholder = 'Write your content', removeButtons = [], buttons = [] } = op;
    if (app_1.Config.app_env) {
        console.log('Jodit Options:', op);
    }
    const fontFamily = app_1.Config.locale === 'bn' ? 'SolaimanLipi' : 'Roboto';
    const elements = Array.isArray(element) ? element : [element];
    const editors = elements.map((el, index) => {
        const defaultButtons = ['bold', 'italic', 'underline', 'fontsize', 'ul', 'ol', 'table', 'link', 'preview', 'source'];
        let buttonsConfig;
        try {
            if (buttons === undefined || buttons === null) {
                // No buttons option provided
                buttonsConfig = defaultButtons;
            }
            else {
                const currentButtons = Array.isArray(buttons?.[0]) ? (buttons[index] ?? []) : buttons;
                buttonsConfig = [...new Set([...defaultButtons, ...currentButtons])];
            }
        }
        catch {
            buttonsConfig = Jodit.defaultOptions.buttons;
        }
        const currentRemoveButtons = Array.isArray(removeButtons?.[0]) ? (removeButtons[index] ?? []) : (removeButtons ?? []);
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
            language: app_1.Config.locale,
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
//# sourceMappingURL=jodit.js.map