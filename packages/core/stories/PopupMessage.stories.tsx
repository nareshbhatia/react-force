import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Message, MessageFactory } from '@react-force/models';
import React, { useState } from 'react';
import { PopupMessage, ViewCenteredContainer } from '../src';

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const metadata = {
    component: PopupMessage,
    title: 'core/PopupMessage',
};
export default metadata;

export const PopupMessageStory = () => {
    const classes = useStyles();
    const [message, setMessage] = useState<Message>();
    const errorMessage = MessageFactory.error('This is an error message');
    const warningMessage = MessageFactory.warning('This is a warning message');
    const infoMessage = MessageFactory.info('This is an info message');
    const successMessage = MessageFactory.success('This is a success message');

    return (
        <ViewCenteredContainer>
            <Button
                variant="outlined"
                className={classes.button}
                onClick={() => {
                    setMessage(errorMessage);
                }}
            >
                Error
            </Button>
            <Button
                variant="outlined"
                className={classes.button}
                onClick={() => {
                    setMessage(warningMessage);
                }}
            >
                Warning
            </Button>
            <Button
                variant="outlined"
                className={classes.button}
                onClick={() => {
                    setMessage(infoMessage);
                }}
            >
                Info
            </Button>
            <Button
                variant="outlined"
                className={classes.button}
                onClick={() => {
                    setMessage(successMessage);
                }}
            >
                Success
            </Button>

            <PopupMessage
                message={message}
                onClose={() => {
                    setMessage(undefined);
                }}
            />
        </ViewCenteredContainer>
    );
};
PopupMessageStory.storyName = 'PopupMessage';
