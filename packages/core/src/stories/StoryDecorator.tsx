import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { MessageProvider } from '../contexts';
import { CssBaseline } from '../CssBaseline';
import { MessageRenderer } from '../MessageRenderer';
import { theme } from './theme';

export const StoryDecorator = (story: any) => {
    return (
        <ThemeProvider theme={theme}>
            <MessageProvider>
                <CssBaseline />
                {story()}
                <MessageRenderer />
            </MessageProvider>
        </ThemeProvider>
    );
};
