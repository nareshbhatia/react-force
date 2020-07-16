import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Day, DayEnum, days } from '@react-force/mock-data';
import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../stories';
import { SelectControl } from './SelectControl';

const Example = () => {
    const [dayId, setDayId] = useState<DayEnum>('mon');
    const selectedDay: Day = days.find((day) => day.id === dayId) as Day;

    const handleChange = (event: any) => {
        setDayId(event.target.value);
    };

    return (
        <Box p={2}>
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
        </Box>
    );
};

storiesOf('SelectControl', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <Example />);
