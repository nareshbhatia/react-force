import { Editor, Element } from 'slate';

export const getImage = (editor: Editor): Element | undefined => {
    const imageEntries = Array.from(
        Editor.nodes(editor, { match: (n) => n.type === 'image' })
    );
    if (imageEntries.length === 0) {
        return undefined;
    }

    const node = imageEntries[0][0];
    return Element.isElement(node) ? node : undefined;
};
