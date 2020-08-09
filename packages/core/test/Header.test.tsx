import React from 'react';
import { Header, HeaderTitle } from '../src';
import { render } from './utils';

describe('<Header />', () => {
    it('renders a title using <HeaderTitle />', () => {
        const title = 'React Force';
        const { getByText } = render(
            <Header>
                <HeaderTitle>{title}</HeaderTitle>
            </Header>
        );
        expect(getByText(title)).toBeInTheDocument();
    });
});
