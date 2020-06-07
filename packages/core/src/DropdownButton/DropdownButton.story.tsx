import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../stories';
import { DropdownButton } from './DropdownButton';

type MergeOption = { id: string; label: string };

const options: Array<MergeOption> = [
    { id: 'mergeCommit', label: 'Create a merge commit' },
    { id: 'squashMerge', label: 'Squash and merge' },
    { id: 'rebaseMerge', label: 'Rebase and merge' },
];

const getOptionLabel = (option: MergeOption) => option.label;

const DropdownButtonExample = () => {
    const [selected, setSelected] = useState<MergeOption>(options[0]);

    return (
        <DropdownButton<MergeOption>
            value={selected}
            options={options}
            getOptionLabel={getOptionLabel}
            onChange={(value: MergeOption) => {
                console.log(value.id);
                setSelected(value);
            }}
        />
    );
};

storiesOf('DropdownButton', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => (
        <Box p={2}>
            <DropdownButtonExample />
        </Box>
    ));
