type MessageType = 'success' | 'warning' | 'error' | 'info';

export interface Message {
    type: MessageType;
    text: string;
}

export const MessageFactory = {
    success: (text: string): Message => ({
        type: 'success',
        text,
    }),
    warning: (text: string): Message => ({
        type: 'warning',
        text,
    }),
    error: (text: string): Message => ({
        type: 'error',
        text,
    }),
    info: (text: string): Message => ({
        type: 'info',
        text,
    }),
};
