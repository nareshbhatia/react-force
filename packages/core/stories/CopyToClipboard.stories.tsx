import { MessageFactory } from '@react-force/models';
import React from 'react';
import { CopyToClipboard, useMessageSetter } from '../src';

const metadata = {
    component: CopyToClipboard,
    title: 'core/CopyToClipboard',
};
export default metadata;

export const CopyToClipboardStory = () => {
    const setMessage = useMessageSetter();
    const message = MessageFactory.success('Text copied to clipboard');

    return (
        <CopyToClipboard
            text="https://github.com/nareshbhatia/react-force"
            onCopied={() => {
                setMessage(message);
            }}
        />
    );
};
CopyToClipboardStory.storyName = 'CopyToClipboard';
