import { Editor } from 'slate';
import { isMarkActive } from '../queries';

export const toggleMark = (editor: Editor, markType: string) => {
    const isActive = isMarkActive(editor, markType);

    if (isActive) {
        editor.removeMark(markType);
    } else {
        editor.addMark(markType, true);
    }
};
