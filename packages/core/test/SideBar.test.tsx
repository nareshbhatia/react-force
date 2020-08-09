import BalancesIcon from '@material-ui/icons/Money';
import SettingsIcon from '@material-ui/icons/Settings';
import TransfersIcon from '@material-ui/icons/SwapHoriz';
import React from 'react';
import { NavComponent, SideBar } from '../src';
import { fireEvent, render } from './utils';

const handleNavItemSelected = jest.fn();

const navComponents: Array<NavComponent> = [
    {
        type: 'group',
        title: 'Account',
        items: [
            {
                id: 'balances',
                title: 'Balances',
                icon: <BalancesIcon fontSize="small" />,
            },
            {
                id: 'transfers',
                title: 'Transfers',
                icon: <TransfersIcon fontSize="small" />,
            },
        ],
    },
    {
        type: 'divider',
    },
    {
        type: 'group',
        items: [
            {
                id: 'settings',
                title: 'Settings',
                icon: <SettingsIcon fontSize="small" />,
            },
        ],
    },
];

describe('SideBar', () => {
    beforeEach(() => {
        handleNavItemSelected.mockReset();
    });

    it('calls onNavItemSelected when a nav item is clicked', () => {
        const { getByText } = render(
            <SideBar
                components={navComponents}
                selectedNavItemId="balances"
                onNavItemSelected={handleNavItemSelected}
            />
        );

        fireEvent.click(getByText('Transfers'));
        expect(handleNavItemSelected).toBeCalledWith('transfers');
    });
});
