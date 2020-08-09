import IconButton from '@material-ui/core/IconButton';
import React from 'react';

export interface IconLinkProps {
    href: string;
    className?: string;
}

export const IconLink: React.FC<IconLinkProps> = ({
    href,
    className,
    children,
}) => {
    const handleClick = () => {
        window.open(href);
    };

    return (
        <IconButton className={className} onClick={handleClick}>
            {children}
        </IconButton>
    );
};
