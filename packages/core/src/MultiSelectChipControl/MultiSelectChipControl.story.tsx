import React, { Fragment, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Day, days } from '@react-force/mock-data';
import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../stories';
import { MultiSelectChipControl } from './MultiSelectChipControl';

const DayFilter = () => {
    const [selectedDays, setSelectedDays] = useState<Array<Day>>([
        days[0],
        days[2],
        days[4],
    ]);

    const handleChange = (value: Array<Day>) => {
        setSelectedDays(value);
    };

    return (
        <Fragment>
            <MultiSelectChipControl<Day>
                label="DAYS"
                value={selectedDays}
                options={days}
                getOptionLabel={(option: Day) => option.name}
                onChange={handleChange}
            />

            <Box mt={4} p={1}>
                <Typography variant="h6">Selected Days</Typography>
                <Typography>
                    {selectedDays.map((day) => day.name).join(', ')}
                </Typography>
            </Box>
        </Fragment>
    );
};

storiesOf('MultiSelectChipControl', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <DayFilter />);
