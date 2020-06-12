import React from 'react';
import { PopupMessage } from '../PopupMessage';
import { useMessageContext, useMessageSetterContext } from '../contexts';

export const MessageRenderer = () => {
    const message = useMessageContext();
    const setMessage = useMessageSetterContext();

    return (
        <PopupMessage
            message={message}
            onClose={() => {
                setMessage(undefined);
            }}
        />
    );
};
