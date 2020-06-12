import React, { useContext, useState } from 'react';
import { Message } from '../models';

// ---------- MessageContext ----------
type MessageSetter = (message?: Message) => void;

const MessageContext = React.createContext<Message | undefined>(undefined);
const MessageSetterContext = React.createContext<MessageSetter | undefined>(
    undefined
);

// ---------- Hooks ----------
function useMessageContext(): Message | undefined {
    return useContext(MessageContext);
}

function useMessageSetterContext(): MessageSetter {
    const messageSetter = useContext(MessageSetterContext);
    if (messageSetter === undefined) {
        /* istanbul ignore next */
        throw new Error(
            'useMessageSetterContext must be used within a MessageProvider'
        );
    }
    return messageSetter;
}

// ---------- MessageProvider ----------
const MessageProvider: React.FC = ({ children }) => {
    const [message, setMessage] = useState<Message | undefined>();

    return (
        <MessageContext.Provider value={message}>
            <MessageSetterContext.Provider value={setMessage}>
                {children}
            </MessageSetterContext.Provider>
        </MessageContext.Provider>
    );
};

export { MessageProvider, useMessageContext, useMessageSetterContext };
