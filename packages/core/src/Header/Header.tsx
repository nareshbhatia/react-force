import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';

export const Header: React.FC = ({ children }) => (
    <AppBar position="static">
        <Toolbar>{children}</Toolbar>
    </AppBar>
);
