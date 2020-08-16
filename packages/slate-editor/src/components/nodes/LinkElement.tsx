import React from 'react';
import { RenderElementProps } from 'slate-react';

export const LinkElement = ({
    element,
    attributes,
    children,
}: RenderElementProps) => {
    const url = element.url as string;
    return element.openInNewTab ? (
        <a {...attributes} href={url} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    ) : (
        <a {...attributes} href={url}>
            {children}
        </a>
    );
};
