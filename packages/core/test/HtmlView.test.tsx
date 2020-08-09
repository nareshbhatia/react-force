import React from 'react';
import { HtmlView } from '../src';
import { render } from './utils';

const content = '<p>Hello!</p>';

describe('HtmlView', () => {
    it('renders its content', () => {
        const { getByText } = render(<HtmlView html={content} />);
        expect(getByText('Hello!')).toBeInTheDocument();
    });
});
