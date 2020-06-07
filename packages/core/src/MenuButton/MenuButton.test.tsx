import React from 'react';
import { render, fireEvent } from '../test';
import { MenuButton } from './MenuButton';

type MergeOption = { id: string; label: string };

const options: Array<MergeOption> = [
    { id: 'mergeCommit', label: 'Create a merge commit' },
    { id: 'squashMerge', label: 'Squash and merge' },
    { id: 'rebaseMerge', label: 'Rebase and merge' },
];

const getOptionLabel = (option: MergeOption) => option.label;

const handleClick = jest.fn();

describe('MenuButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('selects desired option when selected from dropdown', () => {
        const { getByLabelText, getByText } = render(
            <MenuButton<MergeOption>
                buttonLabel="Select Merge Option"
                options={options}
                getOptionLabel={getOptionLabel}
                onChange={handleClick}
            />
        );

        // Click the menu button to open the dropdown
        const button = getByLabelText('select option');
        fireEvent.click(button);

        // Click on 'Rebase and merge'
        const rebaseMergeButton = getByText('Rebase and merge');
        fireEvent.click(rebaseMergeButton);

        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(options[2]);
    });
});
