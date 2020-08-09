import React, { useState } from 'react';
import { ProgressButton } from '../src';

const metadata = {
    component: ProgressButton,
    title: 'core/ProgressButton',
};
export default metadata;

export const ProgressButtonStory = () => {
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
ProgressButtonStory.storyName = 'ProgressButton';
