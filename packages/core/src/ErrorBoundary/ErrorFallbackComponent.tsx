import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { StringUtils } from '@react-force/utils';
import { ViewCenteredContainer } from '..';

const useStyles = makeStyles((theme: Theme) => ({
    dark: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.grey.A400,
    },
}));

export interface ErrorFallbackComponentProps {
    error: any;
}

export const ErrorFallbackComponent = ({
    error,
}: ErrorFallbackComponentProps) => {
    const classes = useStyles();
    return (
        <ViewCenteredContainer
            data-testid="error-fallback"
            p={2}
            className={classes.dark}
        >
            <Typography component="h1" variant="h3">
                {StringUtils.errorToString(error)}
            </Typography>
        </ViewCenteredContainer>
    );
};
