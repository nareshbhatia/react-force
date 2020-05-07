import React from 'react';
import { render } from '../test';
import { CssBaseline } from './CssBaseline';

const content = 'Test Content';

describe('<CssBaseline />', () => {
    it('renders children correctly', () => {
        const { getByText } = render(
            <CssBaseline>
                <h1>{content}</h1>
            </CssBaseline>
        );
        expect(getByText(content)).toBeInTheDocument();
    });
});
