import escapeHtml from 'escape-html';
import { Node, Text } from 'slate';
import { ElementType } from '../models';

// Recursive function - recurses on children
const serialize = (node: Node): string => {
    // if text node, stop recursion
    if (Text.isText(node)) {
        let html = escapeHtml(node.text);
        if (node.bold) {
            html = `<strong>${html}</strong>`;
        }
        if (node.italic) {
            html = `<em>${html}</em>`;
        }
        if (node.underline) {
            html = `<u>${html}</u>`;
        }
        if (node.strikethrough) {
            html = `<s>${html}</s>`;
        }
        if (node.code) {
            html = `<code>${html}</code>`;
        }
        return html;
    }

    // if void node, stop recursion
    switch (node.type as ElementType) {
        case 'image': {
            const url = escapeHtml(node.url as string);
            const alt = escapeHtml(node.alt as string);
            return `<img src="${url}" alt="${alt}" class="rf-img" />`;
        }
    }

    // if non-leaf node, recurse on children and then process self
    const children = node.children.map((n) => serialize(n)).join('');

    switch (node.type as ElementType) {
        case 'block-quote':
            return `<blockquote>${children}</blockquote>`;
        case 'bulleted-list':
            return `<ul>${children}</ul>`;
        case 'heading1':
            return `<h1>${children}</h1>`;
        case 'heading2':
            return `<h2>${children}</h2>`;
        case 'heading3':
            return `<h3>${children}</h3>`;
        case 'heading4':
            return `<h4>${children}</h4>`;
        case 'heading5':
            return `<h5>${children}</h5>`;
        case 'heading6':
            return `<h6>${children}</h6>`;
        case 'link': {
            const url = escapeHtml(node.url as string);
            const targetStr = node.openInNewTab
                ? 'target="_blank" rel="noopener noreferrer"'
                : '';
            return `<a href="${url}" ${targetStr}>${children}</a>`;
        }
        case 'list-item':
            return `<li>${children}</li>`;
        case 'numbered-list':
            return `<ol>${children}</ol>`;
        case 'paragraph':
            return `<p>${children}</p>`;
        case 'pre':
            return `<pre>${children}</pre>`;
        default:
            return children;
    }
};

export const serializeToHtml = (value: Array<Node>) =>
    serialize({
        children: value,
    });
