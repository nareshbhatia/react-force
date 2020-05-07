import React from 'react';
import { render } from '../test';
import { HtmlView } from './HtmlView';

const content = '<p>Hello!</p>';

describe('HtmlView', () => {
    it('renders its content', () => {
        const { getByText } = render(<HtmlView html={content} />);
        expect(getByText('Hello!')).toBeInTheDocument();
    });
});
