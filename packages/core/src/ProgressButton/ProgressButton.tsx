import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
    wrapper: {
        display: 'inline-block',
        position: 'relative',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export interface ProgressButtonProps extends ButtonProps {
    busy: boolean;
}

export function ProgressButton({
    busy,
    disabled,
    children,
    ...rest
}: ProgressButtonProps) {
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <Button disabled={busy} {...rest}>
                {children}
            </Button>
            {busy && (
                <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                />
            )}
        </div>
    );
}
