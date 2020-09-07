import { Node } from 'slate';
import { jsx } from 'slate-hyperscript';

const deserialize = (el: any): any => {
    if (el.nodeType === 3) {
        return el.textContent;
    } else if (el.nodeType !== 1) {
        return null;
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
        default:
            return el.textContent;
    }
};

export const deserializeFromHtml = (html: string): Array<Node> => {
    const document = new DOMParser().parseFromString(html, 'text/html');
    return deserialize(document.body);
};
