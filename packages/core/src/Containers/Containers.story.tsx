import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../stories';
import { Header, HeaderTitle } from '..';
import {
    FlexContainer,
    CenteredContainer,
    HorizontalContainer,
    VerticalContainer,
    ViewCenteredContainer,
    ViewHorizontalContainer,
    ViewVerticalContainer,
    ScrollingContainer,
    NarrowContainer,
} from './Containers';

const useStyles = makeStyles((theme: Theme) => ({
    lhsCard: {
        borderRadius: 4,
        margin: theme.spacing(2),
        height: 50,
        backgroundColor: theme.palette.primary.dark,
    },
    rhsCard: {
        borderRadius: 4,
        margin: theme.spacing(2),
        height: 125,
        backgroundColor: theme.palette.secondary.main,
    },
}));

const StoryHeader = () => (
    <Header>
        <HeaderTitle>React Force</HeaderTitle>
    </Header>
);

const FlexContainerExample = () => {
    const theme: Theme = useTheme();
    const lightColor = lighten(theme.palette.primary.main, 0.7);
    return (
        <ViewVerticalContainer>
            <StoryHeader />
            <FlexContainer bgcolor={lightColor} p={2}>
                <Typography component="h1" variant="h3">
                    Flex Container
                </Typography>
            </FlexContainer>
        </ViewVerticalContainer>
    );
};

const CenteredContainerExample = () => {
    const theme: Theme = useTheme();
    const lightColor = lighten(theme.palette.primary.main, 0.7);
    return (
        <ViewVerticalContainer>
            <StoryHeader />
            <CenteredContainer bgcolor={lightColor} p={2}>
                <Typography component="h1" variant="h3">
                    Centered Container
                </Typography>
            </CenteredContainer>
        </ViewVerticalContainer>
    );
};

const HorizontalContainerExample = () => {
    const theme: Theme = useTheme();
    const leftColor = lighten(theme.palette.primary.main, 0.7);
    const rightColor = theme.palette.secondary.main;
    return (
        <ViewVerticalContainer>
            <StoryHeader />
            <HorizontalContainer>
                <VerticalContainer bgcolor={leftColor} p={2}>
                    <Typography component="h1" variant="h3">
                        Left
                    </Typography>
                </VerticalContainer>
                <VerticalContainer bgcolor={rightColor} p={2}>
                    <Typography component="h1" variant="h3">
                        Right
                    </Typography>
                </VerticalContainer>
            </HorizontalContainer>
        </ViewVerticalContainer>
    );
};

const VerticalContainerExample = () => {
    const theme: Theme = useTheme();
    const topColor = lighten(theme.palette.primary.main, 0.7);
    const bottomColor = theme.palette.secondary.main;
    return (
        <ViewVerticalContainer>
            <StoryHeader />
            <VerticalContainer>
                <VerticalContainer bgcolor={topColor} p={2}>
                    <Typography component="h1" variant="h3">
                        Top
                    </Typography>
                </VerticalContainer>
                <VerticalContainer bgcolor={bottomColor} p={2}>
                    <Typography component="h1" variant="h3">
                        Bottom
                    </Typography>
                </VerticalContainer>
            </VerticalContainer>
        </ViewVerticalContainer>
    );
};

const ViewCenteredContainerExample = () => {
    const theme: Theme = useTheme();
    const lightColor = lighten(theme.palette.primary.main, 0.7);
    return (
        <ViewCenteredContainer bgcolor={lightColor} p={2}>
            <Typography component="h1" variant="h3">
                View Centered Container
            </Typography>
        </ViewCenteredContainer>
    );
};

const ViewHorizontalContainerExample = () => {
    const theme: Theme = useTheme();
    const leftColor = lighten(theme.palette.primary.main, 0.7);
    const rightColor = theme.palette.secondary.main;
    return (
        <ViewHorizontalContainer>
            <VerticalContainer bgcolor={leftColor} p={2}>
                <Typography component="h1" variant="h3">
                    Left
                </Typography>
            </VerticalContainer>
            <VerticalContainer bgcolor={rightColor} p={2}>
                <Typography component="h1" variant="h3">
                    Right
                </Typography>
            </VerticalContainer>
        </ViewHorizontalContainer>
    );
};

const ViewVerticalContainerExample = () => {
    const theme: Theme = useTheme();
    const topColor = lighten(theme.palette.primary.main, 0.7);
    const bottomColor = theme.palette.secondary.main;
    return (
        <ViewVerticalContainer>
            <VerticalContainer bgcolor={topColor} p={2}>
                <Typography component="h1" variant="h3">
                    Top
                </Typography>
            </VerticalContainer>
            <VerticalContainer bgcolor={bottomColor} p={2}>
                <Typography component="h1" variant="h3">
                    Bottom
                </Typography>
            </VerticalContainer>
        </ViewVerticalContainer>
    );
};

// For scrolling to work correctly, the scrolling container must set overflow
// to 'auto'. However, more importantly, the parent of the scrolling container
// should have min-height set to 0. Without this, scrolling with not work. See
// the two StackOverflow questions below:
// https://stackoverflow.com/questions/55896508/nested-scrolling-containers-using-flexbox
// https://stackoverflow.com/questions/36247140/why-dont-flex-items-shrink-past-content-size
const ScrollingContainerExample = () => {
    const classes = useStyles();
    const theme: Theme = useTheme();
    const lightColor = lighten(theme.palette.primary.main, 0.8);
    return (
        <ViewVerticalContainer>
            <StoryHeader />
            <HorizontalContainer minHeight={0}>
                <ScrollingContainer minWidth={320} bgcolor={lightColor}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                        <div key={i} className={classes.lhsCard} />
                    ))}
                </ScrollingContainer>
                <ScrollingContainer flex="1">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                        <div key={i} className={classes.rhsCard} />
                    ))}
                </ScrollingContainer>
            </HorizontalContainer>
        </ViewVerticalContainer>
    );
};

const NarrowContainerExample = () => {
    const theme: Theme = useTheme();
    const lightColor = lighten(theme.palette.primary.main, 0.7);
    return (
        <ViewVerticalContainer>
            <StoryHeader />
            <NarrowContainer
                bgcolor={lightColor}
                p={2}
                flex="1"
                textAlign="center"
            >
                <Typography component="h1" variant="h3">
                    Narrow Container
                </Typography>
            </NarrowContainer>
        </ViewVerticalContainer>
    );
};

storiesOf('Containers', module)
    .addDecorator(StoryDecorator)
    .add('Flex Container', () => <FlexContainerExample />)
    .add('Centered Container', () => <CenteredContainerExample />)
    .add('Horizontal Container', () => <HorizontalContainerExample />)
    .add('Vertical Container', () => <VerticalContainerExample />)
    .add('View Centered Container', () => <ViewCenteredContainerExample />)
    .add('View Horizontal Container', () => <ViewHorizontalContainerExample />)
    .add('View Vertical Container', () => <ViewVerticalContainerExample />)
    .add('Scrolling Container', () => <ScrollingContainerExample />)
    .add('Narrow Container', () => <NarrowContainerExample />);
