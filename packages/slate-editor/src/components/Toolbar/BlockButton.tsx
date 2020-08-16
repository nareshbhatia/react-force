import ToggleButton, { ToggleButtonProps } from '@material-ui/lab/ToggleButton';
import React, { FormEvent } from 'react';
import { useSlate } from 'slate-react';
import { isBlockActive } from '../../queries';
import { toggleBlock } from '../../transforms';

export interface BlockButtonProps extends ToggleButtonProps {
    blockType: string;
}

export const BlockButton = ({
    blockType,
    children,
    ...props
}: BlockButtonProps) => {
    const editor = useSlate();

    const handleMouseDown = (event: FormEvent<HTMLButtonElement>) => {
        // preventDefault() makes sure that the selection does not go away
        // onMouseDown. This makes the hover toolbar stick.
        // Note: Don't use onClick() or onChange(). onMouseDown() is needed
        // for this mechanism to work.
        event.preventDefault();
        toggleBlock(editor, blockType);
    };

    return (
        <ToggleButton
            size="small"
            value={blockType}
            selected={isBlockActive(editor, blockType)}
            onMouseDown={handleMouseDown}
            {...props}
        >
            {children}
        </ToggleButton>
    );
};
