import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import { fireEvent, render } from '../test';
import { IconLink } from './IconLink';

describe('IconLink', () => {
    it('opens the target URL when clicked', () => {
        const href = 'https://github.com/nareshbhatia/react-force';

        const open = jest
            .spyOn(window, 'open')
            .mockImplementation(
                (
                    url?: string | undefined,
                    target?: string | undefined,
                    features?: string | undefined,
                    replace?: boolean | undefined
                ) => null
            );

        const { getByTestId } = render(
            <IconLink href={href}>
                <GitHubIcon data-testid="github-icon" />
            </IconLink>
        );
        fireEvent.click(getByTestId('github-icon'));
        expect(open).toHaveBeenCalledTimes(1);
        expect(open).toHaveBeenCalledWith(href);
    });
});
