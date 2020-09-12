import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { Fragment } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    '@global': {
        html: {
            // Helps fonts on OSX look more consistent with other systems
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',

            // Use momentum-based scrolling on iOS devices
            WebkitOverflowScrolling: 'touch',

            // Change from `box-sizing: content-box` so that `width`
            // is not affected by `padding` or `border`.
            boxSizing: 'border-box',
        },
        '*, *::before, *::after': {
            boxSizing: 'inherit',
        },
        'strong, b': {
            fontWeight: 'bolder',
        },
        body: {
            margin: 0, // Remove the margin in all browsers.
            color: theme.palette.text.primary,
            ...theme.typography.body2,
            backgroundColor: theme.palette.background.default,
            '@media print': {
                // Save printer ink.
                backgroundColor: theme.palette.common.white,
            },
        },
        blockquote: {
            ...theme.typography.body1,
            fontStyle: 'italic',
            borderLeftWidth: 3,
            borderLeftStyle: 'solid',
            borderLeftColor: theme.palette.text.primary,
            marginLeft: -12,
            paddingLeft: 12,
            paddingBottom: 2,
        },
        'h1, h2, h3, h4, h5, h6': {
            margin: 0,
        },
        h1: {
            ...theme.typography.h1,
        },
        h2: {
            ...theme.typography.h2,
        },
        h3: {
            ...theme.typography.h3,
        },
        h4: {
            ...theme.typography.h4,
        },
        h5: {
            ...theme.typography.h5,
        },
        h6: {
            ...theme.typography.h6,
        },
        p: {
            ...theme.typography.body1,
            margin: '8px 0',
        },
        a: {
            color: theme.palette.primary.main,
            '&:hover': {
                color:
                    /* istanbul ignore next */
                    theme.palette.type === 'light'
                        ? theme.palette.primary.dark
                        : theme.palette.primary.light,
            },
        },
        'ul, ol': {
            ...theme.typography.body1,
            marginLeft: theme.spacing(2),
            padding: 0,
        },
        pre: {
            fontSize: 16,
        },
        '.rf-subtitle': {
            ...theme.typography.h6,
            marginTop: -6,
            fontSize: '0.875rem',
            color: 'rgba(0, 0, 0, 0.66)',
        },
        '.rf-subtitle1': {
            margin: 0,
            ...theme.typography.subtitle1,
        },
        '.rf-subtitle2': {
            margin: 0,
            ...theme.typography.subtitle2,
        },
        '.rf-body1': {
            margin: 0,
            ...theme.typography.body1,
        },
        '.rf-body2': {
            margin: 0,
            ...theme.typography.body2,
        },
        '.rf-mb-0': {
            marginBottom: 0,
        },
        '.rf-mb-1': {
            marginBottom: theme.spacing(1),
        },
        '.rf-mb-2': {
            marginBottom: theme.spacing(2),
        },
        '.rf-mb-3': {
            marginBottom: theme.spacing(3),
        },
        '.rf-mb-4': {
            marginBottom: theme.spacing(4),
        },
        '.rf-mb-gutter': {
            marginBottom: '0.35em',
        },
        '.rf-img': {
            maxWidth: '100%',
        },
    },
}));

export const CssBaseline: React.FC = ({ children }) => {
    useStyles();
    return <Fragment>{children}</Fragment>;
};
