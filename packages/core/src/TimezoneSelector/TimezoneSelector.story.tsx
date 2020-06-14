import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { DefaultTz } from '@react-force/date-utils';
import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../stories';
import { TimezoneSelector } from './TimezoneSelector';

const Example = () => {
    const [timezone, setTimezone] = useState<string>(DefaultTz);

    return (
        <Box p={2}>
            <TimezoneSelector
                label="Time Zone"
                timezone={timezone}
                onChange={setTimezone}
            />

            <Box mt={4}>
                <Typography variant="h6">Selected Time Zone</Typography>
                <Typography>{timezone}</Typography>
            </Box>
        </Box>
    );
};

storiesOf('TimezoneSelector', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <Example />);
