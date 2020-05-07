import React from 'react';
import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../stories';
import { ErrorFallbackComponent } from './ErrorFallbackComponent';

storiesOf('ErrorFallbackComponent', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <ErrorFallbackComponent error="Network Error" />);
