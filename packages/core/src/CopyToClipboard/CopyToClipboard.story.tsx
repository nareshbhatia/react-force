import React from 'react';
import Box from '@material-ui/core/Box';
import { MessageFactory } from '@react-force/models';
import { storiesOf } from '@storybook/react';
import { useMessageSetter } from '../contexts';
import { StoryDecorator } from '../stories';
import { CopyToClipboard } from './CopyToClipboard';

const Example = () => {
    const setMessage = useMessageSetter();
    const message = MessageFactory.success('Text copied to clipboard');

    return (
        <Box p={2}>
            <CopyToClipboard
                text="https://github.com/nareshbhatia/react-force"
                onCopied={() => {
                    setMessage(message);
                }}
            />
        </Box>
    );
};

storiesOf('CopyToClipboard', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <Example />);
