import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import { MessageFactory } from '@react-force/models';
import React from 'react';
import { FakeLink, IconLink, useMessageSetter } from '../src';

const metadata = {
    component: FakeLink,
    title: 'core/Links',
};
export default metadata;

export const FakeLinkStory = () => {
    const setMessage = useMessageSetter();
    const message = MessageFactory.success('Done!');

    const handleClick = () => {
        setMessage(message);
    };

    return (
        <Box p={2}>
            <Typography variant="h5" gutterBottom>
                FakeLink
            </Typography>

            <FakeLink onClick={handleClick}>Do Something...</FakeLink>
        </Box>
    );
};
FakeLinkStory.storyName = 'FakeLink';

export const IconLinkStory = () => {
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
IconLinkStory.storyName = 'IconLink';
