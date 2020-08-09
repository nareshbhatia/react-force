import React from 'react';
import {
    CenteredMessage,
    Loading,
    NotFound,
    ViewCenteredMessage,
} from '../src';
import { render } from './utils';

describe('<CenteredMessage />', () => {
    it('renders a centered message', () => {
        const message = 'Hello!';
        const { getByText } = render(
            <CenteredMessage>{message}</CenteredMessage>
        );
        expect(getByText(message)).toBeInTheDocument();
    });
});

describe('<ViewCenteredMessage />', () => {
    it('renders a view centered message', () => {
        const message = 'Hello!';
        const { getByText } = render(
            <ViewCenteredMessage>{message}</ViewCenteredMessage>
        );
        expect(getByText(message)).toBeInTheDocument();
    });
});

describe('<Loading />', () => {
    it('renders the loading message', () => {
        const message = 'Loading...';
        const { getByText } = render(<Loading />);
        expect(getByText(message)).toBeInTheDocument();
    });
});

describe('<NotFound />', () => {
    it('renders the not found message', () => {
        const message = 'Page Not Found';
        const { getByText } = render(<NotFound />);
        expect(getByText(message)).toBeInTheDocument();
    });
});
