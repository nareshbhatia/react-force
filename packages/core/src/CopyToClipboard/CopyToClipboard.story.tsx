import React from 'react';
import Box from '@material-ui/core/Box';
import { storiesOf } from '@storybook/react';
import { useMessageContext } from '../contexts';
import { MessageFactory } from '../models';
import { StoryDecorator } from '../stories';
import { CopyToClipboard } from './CopyToClipboard';

const Example = () => {
    const messageContext = useMessageContext();
    const message = MessageFactory.success('Text copied to clipboard');

    return (
        <Box p={2}>
            <CopyToClipboard
                text="https://github.com/nareshbhatia/react-force"
                onCopied={() => {
                    messageContext.setMessage(message);
                }}
            />
        </Box>
    );
};

storiesOf('CopyToClipboard', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <Example />);
