import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

export const Header: React.FC = ({ children }) => (
    <AppBar position="static">
        <Toolbar>{children}</Toolbar>
    </AppBar>
);
