import React from 'react';
import { ErrorFallbackComponent } from '../src';

const metadata = {
    component: ErrorFallbackComponent,
    title: 'core/ErrorFallbackComponent',
};
export default metadata;

export const ErrorFallbackComponentStory = () => {
    return <ErrorFallbackComponent error="Network Error" />;
};
ErrorFallbackComponentStory.storyName = 'ErrorFallbackComponent';
