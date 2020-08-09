import React, { useState } from 'react';
import { DropdownButton } from '../src';

type MergeOption = { id: string; label: string };

const options: Array<MergeOption> = [
    { id: 'mergeCommit', label: 'Create a merge commit' },
    { id: 'squashMerge', label: 'Squash and merge' },
    { id: 'rebaseMerge', label: 'Rebase and merge' },
];

const getOptionLabel = (option: MergeOption) => option.label;

const metadata = {
    component: DropdownButton,
    title: 'core/DropdownButton',
};
export default metadata;

export const DropdownButtonStory = () => {
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
DropdownButtonStory.storyName = 'DropdownButton';
