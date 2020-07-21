import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../stories';
import { ProgressButton } from './ProgressButton';

const ProgressButtonExample = () => {
    const [busy, setBusy] = useState(false);

    const handleClick = () => {
        if (!busy) {
            setBusy(true);
            setTimeout(() => {
                setBusy(false);
            }, 1000);
        }
    };

    return (
        <ProgressButton
            variant="contained"
            color="primary"
            busy={busy}
            onClick={handleClick}
        >
            Sync Folders
        </ProgressButton>
    );
};

storiesOf('ProgressButton', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => (
        <Box p={2}>
            <ProgressButtonExample />
        </Box>
    ));
