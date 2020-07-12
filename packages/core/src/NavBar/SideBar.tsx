import React from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { ScrollingContainer, VerticalContainer } from '../Containers';
import { NavBarProps } from './NavBar';

const useStyles = makeStyles(() => ({
    title: {
        fontSize: '1.125rem',
    },
}));

/**
 * A vertical NavBar that is shown on the side of a page
 */
export const SideBar = ({ components, onNavItemSelected }: NavBarProps) => {
    const classes = useStyles();

    return (
        <VerticalContainer flex="0 0 200px" boxShadow={10}>
            <ScrollingContainer flex="1">
                {components.map((component, index) => {
                    switch (component.type) {
                        case 'group':
                            const { title, items } = component;
                            return (
                                <List
                                    key={`nav-component-${index}`}
                                    component="nav"
                                    dense
                                    disablePadding
                                >
                                    {title !== undefined ? (
                                        <ListItem>
                                            <ListItemText
                                                primary={title}
                                                primaryTypographyProps={{
                                                    variant: 'h6',
                                                    className: classes.title,
                                                }}
                                            />
                                        </ListItem>
                                    ) : null}
                                    <List component="div">
                                        {items.map((item) => (
                                            <ListItem
                                                button
                                                key={item.id}
                                                onClick={() =>
                                                    onNavItemSelected(item.id)
                                                }
                                            >
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={item.title}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </List>
                            );
                        case 'divider':
                            return <Divider key={`nav-component-${index}`} />;
                        default:
                            /* istanbul ignore next */
                            return null;
                    }
                })}
            </ScrollingContainer>
        </VerticalContainer>
    );
};
