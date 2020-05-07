import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../stories';
import { Header } from './Header';
import { HeaderTitle } from './HeaderTitle';

storiesOf('Header', module)
    .addDecorator(StoryDecorator)
    .add('With title', () => (
        <Header>
            <HeaderTitle>React Components, Elements, and Instances</HeaderTitle>
        </Header>
    ));
