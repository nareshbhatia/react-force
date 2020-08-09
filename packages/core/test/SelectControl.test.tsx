import React from 'react';
import { SelectControl } from '../src';
import { fireEvent, render } from './utils';

const handleChange = jest.fn();

type Priority = { id: string; name: string };

const priorities: Array<Priority> = [
    { id: 'low', name: 'Low' },
    { id: 'medium', name: 'Medium' },
    { id: 'high', name: 'High' },
];

const PriorityFilter = () => (
    <SelectControl
        name="priority"
        value="low"
        label="Priority"
        options={priorities}
        onChange={handleChange}
    />
);

describe('SelectControl', () => {
    beforeEach(() => {
        handleChange.mockReset();
    });

    it('clicking on an option selects it', async () => {
        const { findByText, getByRole } = render(<PriorityFilter />);

        // Click on the control to open the dropdown
        const button = getByRole('button');
        fireEvent.mouseDown(button);

        // Click on the "high" option
        const highOption = await findByText('High');
        fireEvent.click(highOption);

        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange.mock.calls[0][0].target.value).toBe('high');
    });
});
