import Button, { ButtonProps } from '@material-ui/core/Button';
import React from 'react';

export interface CopyToClipboardProps {
    text: string;
    renderContainer?: (props: ButtonProps) => JSX.Element;
    className?: string;
    onCopied?: () => void;
}

/**
 * Renders a button to copy the supplied text to clipboard
 *
 * Usage:
 *   <CopyToClipboard text={textToCopy} />
 */
export const CopyToClipboard = ({
    text,
    renderContainer = (props) => <Button {...props}>Copy</Button>,
    className,
    onCopied,
}: CopyToClipboardProps) => {
    const handleClick = async () => {
        await navigator.clipboard.writeText(text);
        if (onCopied) {
            onCopied();
        }
    };

    return renderContainer({
        className,
        size: 'small',
        color: 'primary',
        onClick: handleClick,
    });
};
