import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import '@storybook/addon-console';
import { addDecorator } from '@storybook/react';
import {
    CssBaseline,
    MessageProvider,
    MessageRenderer,
} from '../packages/core/src';
import { theme } from './theme';

addDecorator((storyFn) => (
    <ThemeProvider theme={theme}>
        <MessageProvider>
            <CssBaseline />
            {storyFn()}
            <MessageRenderer />
        </MessageProvider>
    </ThemeProvider>
));
