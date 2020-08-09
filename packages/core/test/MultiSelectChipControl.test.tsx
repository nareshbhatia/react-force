import React from 'react';
import { MultiSelectChipControl } from '../src';
import { fireEvent, render } from './utils';

const handleChange = jest.fn();

type Priority = { id: string; name: string };

const priorities: Array<Priority> = [
    { id: 'low', name: 'Low' },
    { id: 'medium', name: 'Medium' },
    { id: 'high', name: 'High' },
];

const PriorityFilter = () => (
    <MultiSelectChipControl<Priority>
        label="Priorities"
        value={[priorities[1]]}
        options={priorities}
        getOptionLabel={(option: Priority) => option.name}
        onChange={handleChange}
    />
);

describe('MultiSelectChipControl', () => {
    beforeEach(() => {
        handleChange.mockReset();
    });

    it('renders the optional label', () => {
        const { getByText } = render(<PriorityFilter />);
        expect(getByText('Priorities')).toBeInTheDocument();
    });

    it('renders only the selected options in primary color', () => {
        const { container } = render(<PriorityFilter />);

        // TODO: Ideally we should be able to get each chip by using getByLabelText
        const chips = container.querySelectorAll('.MuiChip-root');
        expect(chips.length).toBe(3);

        // Only "medium" should be selected
        expect(chips[0].classList.contains('MuiChip-colorPrimary')).toBe(false);
        expect(chips[1].classList.contains('MuiChip-colorPrimary')).toBe(true);
        expect(chips[2].classList.contains('MuiChip-colorPrimary')).toBe(false);
    });

    it('clicking on an unselected chip selects it', async () => {
        const { container } = render(<PriorityFilter />);

        const chips = container.querySelectorAll('.MuiChip-root');
        expect(chips[0].classList.contains('MuiChip-colorPrimary')).toBe(false);

        fireEvent.click(chips[0]);
        expect(handleChange).toBeCalledWith([priorities[1], priorities[0]]);
    });

    it('clicking on an selected chip unselects it', async () => {
        const { container } = render(<PriorityFilter />);

        const chips = container.querySelectorAll('.MuiChip-root');
        expect(chips[1].classList.contains('MuiChip-colorPrimary')).toBe(true);

        fireEvent.click(chips[1]);
        expect(handleChange).toBeCalledWith([]);
    });
});
