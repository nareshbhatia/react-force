import ToggleButton, { ToggleButtonProps } from '@material-ui/lab/ToggleButton';
import React, { FormEvent, Fragment } from 'react';
import { useSlate } from 'slate-react';
import { EditMode } from '../../models';
import { isLinkActive } from '../../queries';

export interface LinkButtonProps extends ToggleButtonProps {
    onEditModeChange: (editMode: EditMode) => void;
}

export const LinkButton = ({
    children,
    onEditModeChange,
    ...props
}: LinkButtonProps) => {
    const editor = useSlate();

    const handleMouseDown = (event: FormEvent<HTMLButtonElement>) => {
        // preventDefault() makes sure that the selection does not go away
        // onMouseDown. This makes the hover toolbar stick.
        // Note: Don't use onClick() or onChange(). onMouseDown() is needed
        // for this mechanism to work.
        event.preventDefault();
        onEditModeChange('link');
    };

    return (
        <Fragment>
            <ToggleButton
                size="small"
                value="link"
                selected={isLinkActive(editor)}
                onMouseDown={handleMouseDown}
                {...props}
            >
                {children}
            </ToggleButton>
        </Fragment>
    );
};
