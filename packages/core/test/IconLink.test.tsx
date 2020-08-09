import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';
import { IconLink } from '../src';
import { fireEvent, render } from './utils';

describe('IconLink', () => {
    it('opens the target URL when clicked', () => {
        const href = 'https://github.com/nareshbhatia/react-force';

        const open = jest
            .spyOn(window, 'open')
            .mockImplementation(
                (
                    _url?: string | undefined,
                    _target?: string | undefined,
                    _features?: string | undefined,
                    _replace?: boolean | undefined
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
