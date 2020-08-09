import React from 'react';
import {
    CenteredMessage,
    Header,
    HeaderTitle,
    Loading,
    NotFound,
    ViewCenteredMessage,
    ViewVerticalContainer,
} from '../src';

const metadata = {
    component: CenteredMessage,
    title: 'core/CenteredMessage',
    parameters: {
        layout: 'fullscreen',
    },
};
export default metadata;

const StoryHeader = () => (
    <Header>
        <HeaderTitle>React Force</HeaderTitle>
    </Header>
);

export const CenteredMessageStory = () => (
    <ViewVerticalContainer>
        <StoryHeader />
        <CenteredMessage>Hello!</CenteredMessage>
    </ViewVerticalContainer>
);
CenteredMessageStory.storyName = 'CenteredMessage';

export const ViewCenteredMessageStory = () => (
    <ViewCenteredMessage>Hello!</ViewCenteredMessage>
);
ViewCenteredMessageStory.storyName = 'ViewCenteredMessage';

export const LoadingStory = () => (
    <ViewVerticalContainer>
        <StoryHeader />
        <Loading />
    </ViewVerticalContainer>
);
LoadingStory.storyName = 'Loading';

export const NotFoundStory = () => <NotFound />;
NotFoundStory.storyName = 'NotFound';
