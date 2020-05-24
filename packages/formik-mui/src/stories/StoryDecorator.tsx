import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

export const StoryDecorator = (story: any) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {story()}
        </ThemeProvider>
    );
};
