import React from 'react';
import { Header, HeaderTitle } from '../src';

const metadata = {
    component: Header,
    title: 'core/Header',
};
export default metadata;

export const HeaderStory = () => {
    return (
        <Header>
            <HeaderTitle>React Components, Elements, and Instances</HeaderTitle>
        </Header>
    );
};
HeaderStory.storyName = 'Header';
