import React from 'react';
import { CssBaseline } from '../src';
import { render } from './utils';

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
