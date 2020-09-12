import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { deserializeFromHtml } from '../deserializers';

export const withHtml = (editor: ReactEditor): ReactEditor => {
    const { insertData } = editor;

    editor.insertData = (data) => {
        const html = data.getData('text/html');

        if (html) {
            const fragment = deserializeFromHtml(html);
            Transforms.insertFragment(editor, fragment);
            return;
        }

        insertData(data);
    };

    return editor;
};
