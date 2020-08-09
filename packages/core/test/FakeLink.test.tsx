import React from 'react';
import { FakeLink } from '../src';
import { fireEvent, render } from './utils';

describe('FakeLink', () => {
    it('calls onClick when clicked', () => {
        const handleClick = jest.fn();

        const { getByText } = render(
            <FakeLink onClick={handleClick}>FakeLink</FakeLink>
        );
        fireEvent.click(getByText('FakeLink'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
