import React from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

export const StoryDecorator = (story: any) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box p={2}>{story()}</Box>
        </ThemeProvider>
    );
};
