"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summer_note = summer_note;
const app_1 = require("../../app");
function summer_note(op) {
    const { element, height = 200, tabSize = 4, placeholder = '' } = op;
    const $editor = $(`.${element}`);
    if (!$editor.length)
        return;
    // @ts-ignore
    $editor.summernote({
        placeholder,
        tabsize: tabSize,
        height,
        width: '100%',
        disableDragAndDrop: true,
        followingToolbar: false,
        callbacks: {
            onChange(contents) {
                if (contents === '<p><br></p>' || contents === '<br>') {
                    // @ts-ignore
                    $editor.summernote('code', '');
                }
            },
            onImageUpload(files) {
                if (!files?.length)
                    return;
                uploadImage(files[0], element);
            },
            onMediaDelete($target) {
                const src = $target[0]?.getAttribute('src');
                if (src)
                    deleteMedia(src);
            },
        },
    });
}
function uploadImage(file, element) {
    if (app_1.Config.app_env)
        console.log('Uploading', file);
    const formData = new FormData();
    if (app_1.Config.csrf_token && app_1.Config.locale) {
        formData.append('file', file);
        formData.append('_token', app_1.Config.csrf_token);
        formData.append('lang', app_1.Config.locale);
    }
    $.ajax({
        url: `${app_1.Config.app_url}upload/summernote`,
        method: 'POST',
        data: formData,
        cache: false,
        processData: false,
        contentType: false,
        headers: {
            Accept: 'multipart/form-data',
        },
        success(res) {
            if (app_1.Config.app_env)
                console.log('summernote response', res);
            if (handleUploadError(res))
                return;
            insertImage(res, element);
        },
        error(xhr) {
            if (app_1.Config.app_env)
                console.error(xhr.responseText);
        },
    });
}
function insertImage(filename, element) {
    const img = document.createElement('img');
    img.src = `${app_1.Config.app_url}${app_1.Config.paths.summernote}${filename}`;
    img.alt = filename;
    img.id = Date.now().toString();
    img.className = 'os-pdf-image';
    const style = {
        width: 150,
        height: 120,
        alignment: 'center',
    };
    img.setAttribute('data-style', JSON.stringify(style));
    img.style.cssText = 'width:150px;height:120px;display:block;margin:0 auto';
    const wrapper = document.createElement('p');
    wrapper.style.textAlign = 'center';
    wrapper.appendChild(img);
    // @ts-ignore
    $(`.${element}`).summernote('insertNode', wrapper);
}
function handleUploadError(res) {
    const errors = {
        size: 'Image size must be below 1MB',
        error: 'Image format not acceptable',
        type: 'jpg, png or gif accepted only',
    };
    if (errors[res]) {
        alert(errors[res]);
        return true;
    }
    return false;
}
function deleteMedia(imgUrl) {
    const file = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
    $.ajax({
        url: `${app_1.Config.app_url}delete/summernote`,
        method: 'POST',
        data: {
            img: file,
            _token: app_1.Config.csrf_token,
        },
        success(res) {
            if (res === 'error') {
                alert('Image not found, try refresh');
            }
        },
        error(xhr) {
            if (app_1.Config.app_env)
                console.error(xhr.responseText);
        },
    });
}
//# sourceMappingURL=summernote.js.map