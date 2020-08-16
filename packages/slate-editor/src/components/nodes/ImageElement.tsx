import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { RenderElementProps, useSelected, useFocused } from 'slate-react';

const useStyles = makeStyles(() => ({
    selected: {
        opacity: 0.7,
    },
}));

export const ImageElement = ({
    element,
    attributes,
    children,
}: RenderElementProps) => {
    const classes = useStyles();
    const selected = useSelected();
    const focused = useFocused();

    const url = element.url as string;
    const alt = typeof element.alt === 'string' ? element.alt : undefined;
    const imgClass = selected && focused ? classes.selected : undefined;

    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img className={imgClass} src={url} alt={alt} />
            </div>
            {children}
        </div>
    );
};
