import React from 'react';
import Box from '@material-ui/core/Box';
import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../stories';
import { MenuButton } from './MenuButton';

type MergeOption = { id: string; label: string };

const options: Array<MergeOption> = [
    { id: 'mergeCommit', label: 'Create a merge commit' },
    { id: 'squashMerge', label: 'Squash and merge' },
    { id: 'rebaseMerge', label: 'Rebase and merge' },
];

const getOptionLabel = (option: MergeOption) => option.label;

const MenuButtonExample = () => {
    return (
        <MenuButton<MergeOption>
            buttonLabel="Select Merge Option"
            options={options}
            getOptionLabel={getOptionLabel}
            onChange={(value: MergeOption) => {
                console.log(value.id);
            }}
        />
    );
};

storiesOf('MenuButton', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => (
        <Box p={2}>
            <MenuButtonExample />
        </Box>
    ));
