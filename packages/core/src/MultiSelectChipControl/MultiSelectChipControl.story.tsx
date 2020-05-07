import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { StoryDecorator } from '../stories';
import { MultiSelectChipControl } from './MultiSelectChipControl';

const days = [
    { id: 'mon', name: 'Monday' },
    { id: 'tue', name: 'Tuesday' },
    { id: 'wed', name: 'Wednesday' },
    { id: 'thu', name: 'Thursday' },
    { id: 'fri', name: 'Friday' },
    { id: 'sat', name: 'Saturday' },
    { id: 'sun', name: 'Sunday' },
];

const DayFilter = () => {
    const [selectedDays, setSelectedDays] = useState<Array<string>>([
        'mon',
        'wed',
        'fri',
    ]);
    const handleChange = (value: Array<string>) => {
        setSelectedDays(value);
    };

    return (
        <MultiSelectChipControl
            label="DAYS"
            value={selectedDays}
            options={days}
            onChange={handleChange}
        />
    );
};

storiesOf('MultiSelectChipControl', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <DayFilter />);
