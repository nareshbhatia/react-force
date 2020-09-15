// @ts-ignore: Cannot find module 'image-extensions' or its corresponding type declarations
import imageExtensions from 'image-extensions';
import isUrl from 'is-url';
import { ReactEditor } from 'slate-react';
import { ElementType } from '../models';
import { insertImage } from '../transforms';

const isImageUrl = (url: any) => {
    if (!url) return false;
    if (!isUrl(url)) return false;
    const ext = new URL(url).pathname.split('.').pop();
    return ext !== undefined ? imageExtensions.includes(ext) : false;
};

export const withImages = (editor: ReactEditor): ReactEditor => {
    const { insertData, isVoid } = editor;

    editor.isVoid = (element) => {
        return (element.type as ElementType) === 'image'
            ? true
            : isVoid(element);
    };

    editor.insertData = (data: DataTransfer) => {
        const text = data.getData('text/plain');
        const { files } = data;

        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                const [mime] = file.type.split('/');

                if (mime === 'image') {
                    reader.addEventListener('load', () => {
                        // reader.readAsDataURL() results in a url of type string
                        // see https://developer.mozilla.org/en-US/docs/Web/API/FileReader/result
                        const url = reader.result as string;
                        insertImage(editor, url);
                    });

                    reader.readAsDataURL(file);
                }
            }
        } else if (isImageUrl(text)) {
            insertImage(editor, text);
        } else {
            insertData(data);
        }
    };

    return editor;
};
