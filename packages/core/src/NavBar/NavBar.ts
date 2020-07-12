import { ReactElement } from 'react';

// ---------------------------------------------------------------
// NavGroup - a group of NavItems with an optional title
// ---------------------------------------------------------------
export interface NavItem {
    id: string;
    title: string;
    icon: ReactElement;
}

export interface NavGroup {
    type: 'group';
    title?: string;
    items: Array<NavItem>;
}

// ---------------------------------------------------------------
// NavDivider - divider between NavGroups
// ---------------------------------------------------------------
export interface NavDivider {
    type: 'divider';
}

// ---------------------------------------------------------------
// NavComponent - NavGroup or NavDivider
// ---------------------------------------------------------------
export type NavComponent = NavGroup | NavDivider;

// ---------------------------------------------------------------
// NavBar - a list of NavComponents
// ---------------------------------------------------------------
export interface NavBarProps {
    components: Array<NavComponent>;
    selectedNavItemId: string;
    onNavItemSelected: (navItemId: string) => void;
}
