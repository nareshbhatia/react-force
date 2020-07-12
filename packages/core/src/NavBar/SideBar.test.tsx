import React from 'react';
import BalancesIcon from '@material-ui/icons/Money';
import TransfersIcon from '@material-ui/icons/SwapHoriz';
import SettingsIcon from '@material-ui/icons/Settings';
import { fireEvent, render } from '../test';
import { NavComponent } from './NavBar';
import { SideBar } from './SideBar';

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
