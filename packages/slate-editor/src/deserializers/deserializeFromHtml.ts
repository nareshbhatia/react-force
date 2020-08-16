/*
import { Node } from 'slate';

const deserialize = (el: HTMLElement): Array<Node> => {
    if (el.nodeType === 3 && el.textContent !== null) {
        return [{ text: el.textContent }];
    } else if (el.nodeType !== 1) {
        return [];
    } else if (el.nodeName === 'BR') {
        return [{ text: '\n' }];
    }

    const { nodeName } = el;
    let parent = el;

    if (
        nodeName === 'PRE' &&
        el.childNodes[0] &&
        el.childNodes[0].nodeName === 'CODE'
    ) {
        parent = el.childNodes[0];
    }
    const children = Array.from(parent.childNodes).map(deserialize).flat();

    if (el.nodeName === 'BODY') {
        return jsx('fragment', {}, children);
    }

    if (ELEMENT_TAGS[nodeName]) {
        const attrs = ELEMENT_TAGS[nodeName](el);
        return jsx('element', attrs, children);
    }

    if (TEXT_TAGS[nodeName]) {
        const attrs = TEXT_TAGS[nodeName](el);
        return children.map((child) => jsx('text', attrs, child));
    }

    return children;
};

export const deserializeFromHtml = (html: string): Array<Node> => {
    const document = new DOMParser().parseFromString(html, 'text/html');
    return deserialize(document.body);
};
*/

export const deserializeFromHtml = () => {};
