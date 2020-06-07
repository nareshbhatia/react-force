import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { days } from '../test/mock-data';
import { StoryDecorator } from '../stories';
import { SelectControl } from './SelectControl';

const Example = () => {
    const [dayId, setDayId] = useState('Mon');

    return (
        <SelectControl
            name="day"
            value={dayId}
            label="Day"
            options={days}
            fullWidth
            onChange={(event: any) => {
                setDayId(event.target.value);
            }}
        />
    );
};

storiesOf('SelectControl', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <Example />);
