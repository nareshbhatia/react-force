import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
export const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#556CD6',
        },
        secondary: {
            main: '#FBC02D',
        },
        error: {
            main: red.A400,
        },
    },
    overrides: {
        MuiTableCell: {
            root: {
                // Tighten padding-right from 40px to 16px
                padding: '14px 16px',
            },
        },
    },
});
