import React, { Fragment } from 'react';
import { DropdownButton } from '../src';
import { render, fireEvent } from './utils';

type MergeOption = { id: string; label: string };

const options: Array<MergeOption> = [
    { id: 'mergeCommit', label: 'Create a merge commit' },
    { id: 'squashMerge', label: 'Squash and merge' },
    { id: 'rebaseMerge', label: 'Rebase and merge' },
];

const getOptionLabel = (option: MergeOption) => option.label;

const handleClick = jest.fn();

describe('DropdownButton', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('selects current option when left button is clicked', () => {
        const { getByLabelText } = render(
            <DropdownButton<MergeOption>
                value={options[1]}
                options={options}
                getOptionLabel={getOptionLabel}
                onChange={handleClick}
            />
        );

        // Click on the left button to select current option
        const leftButton = getByLabelText('select current option');
        fireEvent.click(leftButton);

        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(options[1]);
    });

    it('selects desired option when selected from dropdown', () => {
        const { getByLabelText, getByText } = render(
            <DropdownButton<MergeOption>
                value={options[1]}
                options={options}
                getOptionLabel={getOptionLabel}
                onChange={handleClick}
            />
        );

        // Click the right button to open the dropdown
        const rightButton = getByLabelText('select option');
        fireEvent.click(rightButton);

        // Click on 'Rebase and merge'
        const rebaseMergeButton = getByText('Rebase and merge');
        fireEvent.click(rebaseMergeButton);

        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(options[2]);
    });

    it('clicking outside the dropdown or twice on the right button closes the dropdown', () => {
        const { getByLabelText, getByText } = render(
            <Fragment>
                <DropdownButton<MergeOption>
                    value={options[1]}
                    options={options}
                    getOptionLabel={getOptionLabel}
                    onChange={handleClick}
                />
                <button>Dummy</button>
            </Fragment>
        );

        // Click the right button to open the dropdown
        const rightButton = getByLabelText('select option');
        fireEvent.click(rightButton);

        // Click on the dummy button to close the dropdown
        const dummyButton = getByText('Dummy');
        fireEvent.click(dummyButton);

        // Click the right button to open the dropdown
        fireEvent.click(rightButton);

        // Click the right button again to close the dropdown
        fireEvent.click(rightButton);

        expect(handleClick).toHaveBeenCalledTimes(0);
    });
});
