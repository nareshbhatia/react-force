import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import BalancesIcon from '@material-ui/icons/Money';
import TransfersIcon from '@material-ui/icons/SwapHoriz';
import TransactionsIcon from '@material-ui/icons/List';
import SettingsIcon from '@material-ui/icons/Settings';
import SignOutIcon from '@material-ui/icons/Lock';
import { storiesOf } from '@storybook/react';
import {
    HorizontalContainer,
    ScrollingContainer,
    ViewVerticalContainer,
} from '../Containers';
import { Header, HeaderTitle } from '../Header';
import { StoryDecorator } from '../stories';
import { NavComponent } from './NavBar';
import { SideBar } from './SideBar';

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
            {
                id: 'transactions',
                title: 'Transactions',
                icon: <TransactionsIcon fontSize="small" />,
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
            {
                id: 'signOut',
                title: 'Sign out',
                icon: <SignOutIcon fontSize="small" />,
            },
        ],
    },
];

const SideBarExample = () => {
    const [selectedNavId, setSelectedNavId] = useState('balances');

    const handleNavItemSelected = (navItemId: string) => {
        setSelectedNavId(navItemId);
    };

    return (
        <ViewVerticalContainer>
            <Header>
                <HeaderTitle>React Force</HeaderTitle>
            </Header>
            <HorizontalContainer minHeight={0}>
                <SideBar
                    components={navComponents}
                    selectedNavItemId={selectedNavId}
                    onNavItemSelected={handleNavItemSelected}
                />
                <ScrollingContainer flex="1" p={2}>
                    <Typography variant="h5" component="h2">
                        {selectedNavId}
                    </Typography>
                </ScrollingContainer>
            </HorizontalContainer>
        </ViewVerticalContainer>
    );
};

storiesOf('SideBar', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <SideBarExample />);
