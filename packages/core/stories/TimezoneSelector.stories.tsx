import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { DefaultTz } from '@react-force/date-utils';
import React, { Fragment, useState } from 'react';
import { TimezoneSelector } from '../src';

const metadata = {
    component: TimezoneSelector,
    title: 'core/TimezoneSelector',
};
export default metadata;

export const TimezoneSelectorStory = () => {
    const [timezone, setTimezone] = useState<string>(DefaultTz);

    return (
        <Fragment>
            <TimezoneSelector
                label="Time Zone"
                timezone={timezone}
                onChange={setTimezone}
            />

            <Box mt={4}>
                <Typography variant="h6">Selected Time Zone</Typography>
                <Typography>{timezone}</Typography>
            </Box>
        </Fragment>
    );
};
TimezoneSelectorStory.storyName = 'TimezoneSelector';
