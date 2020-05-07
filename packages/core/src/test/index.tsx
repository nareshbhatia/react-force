import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { render } from '@testing-library/react';

const TestWrapper: React.FC = ({ children }) => {
    return (
        <ThemeProvider theme={createMuiTheme()}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

const customRender = (ui: React.ReactElement<any>, options?: any) =>
    render(ui, { wrapper: TestWrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
