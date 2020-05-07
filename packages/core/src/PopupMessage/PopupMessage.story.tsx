import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { storiesOf } from '@storybook/react';
import { Message, MessageFactory } from '../models';
import { StoryDecorator } from '../stories';
import { ViewCenteredContainer } from '../Containers';
import { PopupMessage } from './PopupMessage';

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const PopupMessageExample = () => {
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

storiesOf('PopupMessage', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <PopupMessageExample />);
