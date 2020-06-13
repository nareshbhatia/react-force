import React from 'react';
import { PopupMessage } from '../PopupMessage';
import { useMessage, useMessageSetter } from '../contexts';

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
