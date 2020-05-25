import React from 'react';
import { fireEvent, render } from '../test';
import { FakeLink } from './FakeLink';

describe('FakeLink', () => {
    it('calls on click when clicked', () => {
        const handleClick = jest.fn();

        const { getByText } = render(
            <FakeLink onClick={handleClick}>FakeLink</FakeLink>
        );
        fireEvent.click(getByText('FakeLink'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
