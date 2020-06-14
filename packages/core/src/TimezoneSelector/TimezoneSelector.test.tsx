import React from 'react';
import { DefaultTz } from '@react-force/date-utils';
import { fireEvent, render } from '../test';
import { TimezoneSelector } from './TimezoneSelector';

const handleChange = jest.fn();

describe('SelectControl', () => {
    beforeEach(() => {
        handleChange.mockReset();
    });

    it('Selecting an option calls onChange()', async () => {
        const { getByRole } = render(
            <TimezoneSelector timezone={DefaultTz} onChange={handleChange} />
        );

        function checkHighlightToBe(expected) {
            expect(
                getByRole('listbox').querySelector('li[data-focus]')
            ).toHaveTextContent(expected);
        }

        // Type "Calcutta" into the input field
        const input = getByRole('textbox');
        fireEvent.change(input, { target: { value: 'Calcutta' } });
        checkHighlightToBe('Calcutta');

        // Select the "Calcutta" option
        fireEvent.keyDown(input, { key: 'Enter' });

        // Expect onChange to be called with 'Asia/Calcutta'
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange.mock.calls[0][0]).toBe('Asia/Calcutta');
    });
});
