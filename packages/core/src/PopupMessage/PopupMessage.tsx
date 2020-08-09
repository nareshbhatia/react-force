import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { Message } from '@react-force/models';
import React from 'react';

export interface MessagePopupProps {
    message?: Message;
    onClose: () => void;
}

export function PopupMessage({ message, onClose }: MessagePopupProps) {
    if (!message) {
        return null;
    }

    return (
        <Snackbar open={true} autoHideDuration={10000} onClose={onClose}>
            <Alert
                onClose={onClose}
                severity={message.type}
                elevation={6}
                variant="filled"
            >
                {message.text}
            </Alert>
        </Snackbar>
    );
}
