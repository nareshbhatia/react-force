import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import { storiesOf } from '@storybook/react';
import { useMessageContext } from '../contexts';
import { MessageFactory } from '../models';
import { StoryDecorator } from '../stories';
import { FakeLink } from './FakeLink';
import { IconLink } from './IconLink';

const FakeLinkExample = () => {
    const messageContext = useMessageContext();
    const message = MessageFactory.info('Done!');

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                FakeLink
            </Typography>

            <FakeLink
                onClick={() => {
                    messageContext.setMessage(message);
                }}
            >
                Do Something...
            </FakeLink>
        </Box>
    );
};

const IconLinkExample = () => {
    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                IconLink
            </Typography>

            <IconLink href="https://github.com/nareshbhatia/react-force">
                <GitHubIcon />
            </IconLink>
        </Box>
    );
};

storiesOf('Links', module)
    .addDecorator(StoryDecorator)
    .add('FakeLink', () => <FakeLinkExample />)
    .add('IconLink', () => <IconLinkExample />);