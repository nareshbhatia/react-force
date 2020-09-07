import { Node, Text } from 'slate';
import { jsx } from 'slate-hyperscript';
import { MarkType } from '../models';

const marks: Array<MarkType> = [];

const createTextNode = (text: string, marks: Array<MarkType>): Text => {
    // create raw text node
    const textNode: Text = {
        text,
    };

    // set marks
    marks.forEach((mark) => {
        textNode[mark] = true;
    });

    return textNode;
};

const deserialize = (el: any): any => {
    if (el.nodeType === 3) {
        // create the text node including the marks set by parent nodes
        const textNode = createTextNode(el.textContent, marks);

        // clear marks for next use in a text node
        marks.length = 0;

        return textNode;
    } else if (el.nodeType !== 1) {
        return null;
    }

    // ------ collect marks before diving into children ------
    switch (el.nodeName) {
        case 'CODE':
            marks.push('code');
            break;
        case 'EM':
            marks.push('italic');
            break;
        case 'S':
            marks.push('strikethrough');
            break;
        case 'STRONG':
            marks.push('bold');
            break;
        case 'U':
            marks.push('underline');
            break;
    }

    const children = Array.from(el.childNodes).map(deserialize);

    switch (el.nodeName) {
        case 'A':
            return jsx(
                'element',
                {
                    type: 'link',
                    url: el.getAttribute('href'),
                    openInNewTab: el.getAttribute('target') === '_blank',
                },
                children
            );
        case 'BLOCKQUOTE':
            return jsx('element', { type: 'block-quote' }, children);
        case 'BODY':
            return jsx('fragment', {}, children);
        case 'BR':
            return '\n';
        case 'H1':
            return jsx('element', { type: 'heading1' }, children);
        case 'H2':
            return jsx('element', { type: 'heading2' }, children);
        case 'H3':
            return jsx('element', { type: 'heading3' }, children);
        case 'H4':
            return jsx('element', { type: 'heading4' }, children);
        case 'H5':
            return jsx('element', { type: 'heading5' }, children);
        case 'H6':
            return jsx('element', { type: 'heading6' }, children);
        case 'IMG':
            return jsx(
                'element',
                {
                    type: 'image',
                    url: el.getAttribute('src'),
                    alt: el.getAttribute('alt'),
                },
                [{ text: '' }]
            );
        case 'LI':
            return jsx('element', { type: 'list-item' }, children);
        case 'OL':
            return jsx('element', { type: 'numbered-list' }, children);
        case 'P':
            return jsx('element', { type: 'paragraph' }, children);
        case 'PRE':
            return jsx('element', { type: 'pre' }, children);
        case 'UL':
            return jsx('element', { type: 'bulleted-list' }, children);

        // marks are already included in the returned text node
        case 'CODE':
        case 'EM':
        case 'S':
        case 'STRONG':
        case 'U':
            return children;

        default:
            return el.textContent;
    }
};

export const deserializeFromHtml = (html: string): Array<Node> => {
    const document = new DOMParser().parseFromString(html, 'text/html');
    return deserialize(document.body);
};
