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
    // @ts-ignore
    const [{ Jodit }] = await Promise.all([Promise.resolve().then(() => __importStar(require('jodit'))), Promise.resolve().then(() => __importStar(require('jodit/es5/jodit.min.css'))), Promise.resolve().then(() => __importStar(require('jodit/esm/plugins/all.js')))]);
    const { element = '', height = '', placeholder = '', removeButtons = [] } = op;
    const fontFamily = app_1.Config.locale === 'bn' ? 'SolaimanLipi' : 'Roboto';
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