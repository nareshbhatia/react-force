import React from 'react';
import { MenuButton } from '../src';

type MergeOption = { id: string; label: string };

const options: Array<MergeOption> = [
    { id: 'mergeCommit', label: 'Create a merge commit' },
    { id: 'squashMerge', label: 'Squash and merge' },
    { id: 'rebaseMerge', label: 'Rebase and merge' },
];

const getOptionLabel = (option: MergeOption) => option.label;

const metadata = {
    component: MenuButton,
    title: 'core/MenuButton',
};
export default metadata;

export const MenuButtonStory = () => {
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
MenuButtonStory.storyName = 'MenuButton';
