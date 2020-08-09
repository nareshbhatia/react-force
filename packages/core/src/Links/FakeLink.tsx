import { makeStyles, Theme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        color:
            theme.palette.type === 'light'
                ? theme.palette.primary.main
                : theme.palette.primary.contrastText,
        '&:hover': {
            color:
                theme.palette.type === 'light'
                    ? theme.palette.primary.dark
                    : fade(theme.palette.primary.contrastText, 0.8),
        },
        fontWeight: theme.typography.fontWeightMedium,
        cursor: 'pointer',
    },
}));

export interface FakeLinkProps {
    className?: string;
    onClick: () => void;
}

export const FakeLink: React.FC<FakeLinkProps> = ({
    children,
    className,
    onClick,
}) => {
    const classes = useStyles();

    return (
        <span className={`${className} ${classes.root}`} onClick={onClick}>
            {children}
        </span>
    );
};
