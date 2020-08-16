import { Editor, Element } from 'slate';

export const getLink = (editor: Editor): Element | undefined => {
    const linkEntries = Array.from(
        Editor.nodes(editor, { match: (n) => n.type === 'link' })
    );
    if (linkEntries.length === 0) {
        return undefined;
    }

    const node = linkEntries[0][0];
    return Element.isElement(node) ? node : undefined;
};
