import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../stories';
import { ViewVerticalContainer } from '../Containers';
import { Header, HeaderTitle } from '../Header';
import { CenteredMessage } from './CenteredMessage';
import { Loading } from './Loading';
import { NotFound } from './NotFound';
import { ViewCenteredMessage } from './ViewCenteredMessage';

const StoryHeader = () => (
    <Header>
        <HeaderTitle>React Force</HeaderTitle>
    </Header>
);

storiesOf('CenteredMessage', module)
    .addDecorator(StoryDecorator)
    .add('CenteredMessage', () => (
        <ViewVerticalContainer>
            <StoryHeader />
            <CenteredMessage>Hello!</CenteredMessage>
        </ViewVerticalContainer>
    ))
    .add('ViewCenteredMessage', () => (
        <ViewCenteredMessage>Hello!</ViewCenteredMessage>
    ))
    .add('Loading', () => (
        <ViewVerticalContainer>
            <StoryHeader />
            <Loading />
        </ViewVerticalContainer>
    ))
    .add('NotFound', () => <NotFound />);
