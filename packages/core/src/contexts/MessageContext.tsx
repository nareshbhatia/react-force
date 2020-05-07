import React, { ReactNode, useContext, useState } from 'react';
import { Message } from '../models';

// ---------- MessageContext ----------
interface MessageContextValue {
    message?: Message;
    setMessage: (message?: Message) => void;
}

const MessageContext = React.createContext<MessageContextValue>({
    message: undefined,
    setMessage: () => {},
});

// ---------- MessageProvider ----------
type MessageProviderProps = { children: ReactNode };

export const MessageProvider = ({ children }: MessageProviderProps) => {
    const [message, setMessage] = useState<Message>();

    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
        </MessageContext.Provider>
    );
};

// ---------- useMessageContext ----------
export function useMessageContext() {
    const messageContextValue = useContext(MessageContext);
    /* istanbul ignore next */
    if (messageContextValue === undefined) {
        throw new Error(
            'useMessageContext must be used within a MessageContext'
        );
    }
    return messageContextValue;
}
