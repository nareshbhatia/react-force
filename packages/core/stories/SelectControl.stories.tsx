import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Day, DayEnum, days } from '@react-force/mock-data';
import React, { Fragment, useState } from 'react';
import { SelectControl } from '../src';

const metadata = {
    component: SelectControl,
    title: 'core/SelectControl',
};
export default metadata;

export const SelectControlStory = () => {
    const [dayId, setDayId] = useState<DayEnum>('mon');
    const selectedDay: Day = days.find((day) => day.id === dayId) as Day;

    const handleChange = (event: any) => {
        setDayId(event.target.value);
    };

    return (
        <Fragment>
            <SelectControl
                name="day"
                value={dayId}
                label="Day"
                options={days}
                fullWidth
                onChange={handleChange}
            />

            <Box mt={4}>
                <Typography variant="h6">Selected Day</Typography>
                <Typography>{selectedDay.name}</Typography>
            </Box>
        </Fragment>
    );
};
SelectControlStory.storyName = 'SelectControl';
