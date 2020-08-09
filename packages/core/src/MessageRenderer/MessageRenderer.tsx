import React from 'react';
import { useMessage, useMessageSetter } from '../contexts';
import { PopupMessage } from '../PopupMessage';

export const MessageRenderer = () => {
    const message = useMessage();
    const setMessage = useMessageSetter();

    return (
        <PopupMessage
            message={message}
            onClose={() => {
                setMessage(undefined);
            }}
        />
    );
};
