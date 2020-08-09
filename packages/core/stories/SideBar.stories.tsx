import Typography from '@material-ui/core/Typography';
import TransactionsIcon from '@material-ui/icons/List';
import SignOutIcon from '@material-ui/icons/Lock';
import BalancesIcon from '@material-ui/icons/Money';
import SettingsIcon from '@material-ui/icons/Settings';
import TransfersIcon from '@material-ui/icons/SwapHoriz';
import React, { useState } from 'react';
import {
    Header,
    HeaderTitle,
    HorizontalContainer,
    NavComponent,
    ScrollingContainer,
    SideBar,
    ViewVerticalContainer,
} from '../src';

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

const metadata = {
    component: SideBar,
    title: 'core/SideBar',
    parameters: {
        layout: 'fullscreen',
    },
};
export default metadata;

export const SideBarStory = () => {
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
SideBarStory.storyName = 'SideBar';
