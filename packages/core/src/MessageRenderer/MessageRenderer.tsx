import React from 'react';
import { PopupMessage } from '../PopupMessage';
import { useMessageContext } from '../contexts';

export const MessageRenderer = () => {
    const { message, setMessage } = useMessageContext();

    return (
        <PopupMessage
            message={message}
            onClose={() => {
                setMessage(undefined);
            }}
        />
    );
};
