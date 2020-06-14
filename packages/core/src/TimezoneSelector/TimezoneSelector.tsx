import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Timezone, timezones, TzUtils } from '@react-force/date-utils';

const { findTimezone } = TzUtils;

export interface TimezoneSelectorProps {
    timezone: string;
    onChange: (timezone: string) => void;
}

export function TimezoneSelector({
    timezone,
    onChange,
}: TimezoneSelectorProps) {
    const handleChange = (event: any, value: any) => {
        onChange(value.name);
    };

    return (
        <Autocomplete
            disableClearable
            autoComplete
            autoHighlight
            value={findTimezone(timezones, timezone)}
            options={timezones}
            getOptionLabel={(option: Timezone) => option.label}
            renderInput={(params) => (
                <TextField label="Time Zone" margin="normal" {...params} />
            )}
            onChange={handleChange}
        />
    );
}
