import React from 'react';
import { render } from '../test';
import { FloatingAddButton } from './FloatingAddButton';

const handleClick = jest.fn();

describe('FloatingAddButton', () => {
    it('renders the button', () => {
        const { getByLabelText } = render(
            <FloatingAddButton onClick={handleClick} />
        );
        expect(getByLabelText('Add')).toBeInTheDocument();
    });
});
