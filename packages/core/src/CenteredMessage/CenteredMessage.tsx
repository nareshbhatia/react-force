import Typography from '@material-ui/core/Typography';
import React from 'react';
import { CenteredContainer } from '../Containers';

export const CenteredMessage: React.FC = ({ children }) => {
    return (
        <CenteredContainer p={2}>
            <Typography component="h1" variant="h3">
                {children}
            </Typography>
        </CenteredContainer>
    );
};
