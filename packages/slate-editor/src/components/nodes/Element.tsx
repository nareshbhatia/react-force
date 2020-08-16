import React from 'react';
import { RenderElementProps } from 'slate-react';
import { ElementType } from '../../models';
import { ImageElement } from './ImageElement';
import { LinkElement } from './LinkElement';

export const Element = (props: RenderElementProps) => {
    const { element, attributes, children } = props;

    switch (element.type as ElementType) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>;
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>;
        case 'heading1':
            return <h1 {...attributes}>{children}</h1>;
        case 'heading2':
            return <h2 {...attributes}>{children}</h2>;
        case 'heading3':
            return <h3 {...attributes}>{children}</h3>;
        case 'heading4':
            return <h4 {...attributes}>{children}</h4>;
        case 'heading5':
            return <h5 {...attributes}>{children}</h5>;
        case 'heading6':
            return <h6 {...attributes}>{children}</h6>;
        case 'image':
            return <ImageElement {...props} />;
        case 'link':
            return <LinkElement {...props} />;
        case 'list-item':
            return <li {...attributes}>{children}</li>;
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>;
        case 'paragraph':
            return <p {...attributes}>{children}</p>;
        case 'pre':
            return <pre {...attributes}>{children}</pre>;
        default:
            return <p {...attributes}>{children}</p>;
    }
};
