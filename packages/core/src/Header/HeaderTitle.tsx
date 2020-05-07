import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Tweak fontSize & lineHeight to support long titles (multiple lines) on mobile
const useStyles = makeStyles({
    title: {
        flex: 1,
        fontSize: '1.125rem',
        lineHeight: '21px',
    },
});

export const HeaderTitle: React.FC = ({ children }) => {
    const classes = useStyles();

    return (
        <Typography
            variant="h6"
            component="h1"
            color="inherit"
            className={classes.title}
        >
            {children}
        </Typography>
    );
};
