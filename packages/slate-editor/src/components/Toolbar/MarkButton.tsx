import ToggleButton, { ToggleButtonProps } from '@material-ui/lab/ToggleButton';
import React, { FormEvent } from 'react';
import { useSlate } from 'slate-react';
import { isMarkActive } from '../../queries';
import { toggleMark } from '../../transforms';

export interface MarkButtonProps extends ToggleButtonProps {
    markType: string;
}

export const MarkButton = ({
    markType,
    children,
    ...props
}: MarkButtonProps) => {
    const editor = useSlate();

    const handleMouseDown = (event: FormEvent<HTMLButtonElement>) => {
        // preventDefault() makes sure that the selection does not go away
        // onMouseDown. This makes the hover toolbar stick.
        // Note: Don't use onClick() or onChange(). onMouseDown() is needed
        // for this mechanism to work.
        event.preventDefault();
        toggleMark(editor, markType);
    };

    return (
        <ToggleButton
            size="small"
            value={markType}
            selected={isMarkActive(editor, markType)}
            onMouseDown={handleMouseDown}
            {...props}
        >
            {children}
        </ToggleButton>
    );
};
