import React from 'react';
import { fireEvent, render } from '../test';
import { MultiSelectChipControl } from './MultiSelectChipControl';

const handleChange = jest.fn();

const priorities = [
    { id: 'low', name: 'Low' },
    { id: 'medium', name: 'Medium' },
    { id: 'high', name: 'High' },
];

const PriorityFilter = () => (
    <MultiSelectChipControl
        label="Priorities"
        value={['medium']}
        options={priorities}
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
        const days = container.querySelectorAll('.MuiChip-root');
        expect(days.length).toBe(3);

        // Only "medium" should be selected
        expect(days[0].classList.contains('MuiChip-colorPrimary')).toBe(false);
        expect(days[1].classList.contains('MuiChip-colorPrimary')).toBe(true);
        expect(days[2].classList.contains('MuiChip-colorPrimary')).toBe(false);
    });

    it('clicking on an unselected chip selects it', async () => {
        const { container } = render(<PriorityFilter />);

        const days = container.querySelectorAll('.MuiChip-root');
        expect(days[0].classList.contains('MuiChip-colorPrimary')).toBe(false);

        fireEvent.click(days[0]);
        expect(handleChange).toBeCalledWith(['medium', 'low']);
    });

    it('clicking on an selected chip unselects it', async () => {
        const { container } = render(<PriorityFilter />);

        const days = container.querySelectorAll('.MuiChip-root');
        expect(days[1].classList.contains('MuiChip-colorPrimary')).toBe(true);

        fireEvent.click(days[1]);
        expect(handleChange).toBeCalledWith([]);
    });
});
