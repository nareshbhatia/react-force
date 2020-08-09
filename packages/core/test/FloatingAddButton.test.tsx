import React from 'react';
import { FloatingAddButton } from '../src';
import { render } from './utils';

const handleClick = jest.fn();

describe('FloatingAddButton', () => {
    it('renders the button', () => {
        const { getByLabelText } = render(
            <FloatingAddButton onClick={handleClick} />
        );
        expect(getByLabelText('Add')).toBeInTheDocument();
    });
});
