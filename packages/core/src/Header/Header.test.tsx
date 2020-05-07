import React from 'react';
import { render } from '../test';
import { Header } from './Header';
import { HeaderTitle } from './HeaderTitle';

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
