import { Editor } from 'slate';

export const isMarkActive = (editor: Editor, markType: string) => {
    const marks = Editor.marks(editor);
    return marks ? marks[markType] === true : false;
};
