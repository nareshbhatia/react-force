import React from 'react';
import MomentUtils from '@date-io/moment';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { theme } from './theme';

export const StoryDecorator = (story: any) => {
    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <CssBaseline />
                <Box p={2}>{story()}</Box>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
};
