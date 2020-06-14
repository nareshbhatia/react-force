import React, { ReactNode } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Autocomplete, {
    AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import { Timezone, timezones, TzUtils } from '@react-force/date-utils';

const { findTimezone } = TzUtils;

interface AutocompleteInjectedProps {
    disableClearable: boolean;
    autoComplete: boolean;
    autoHighlight: boolean;
    value: Timezone;
    options: Timezone[];
    getOptionLabel: (option: Timezone) => string;
    renderInput: (params: AutocompleteRenderInputParams) => ReactNode;
    onChange: (
        event: object,
        value: Timezone | Timezone[] | null,
        reason: string
    ) => void;
}

export interface TimezoneSelectorProps {
    timezone: string;
    label?: string;
    onChange: (timezone: string) => void;
    renderContainer?: (props: AutocompleteInjectedProps) => JSX.Element;
}

export function TimezoneSelector({
    timezone,
    label,
    onChange,
    renderContainer = (props) => <Autocomplete {...props} />,
}: TimezoneSelectorProps) {
    const handleChange = (event: any, value: any) => {
        onChange(value.name);
    };

    return renderContainer({
        disableClearable: true,
        autoComplete: true,
        autoHighlight: true,
        value: findTimezone(timezones, timezone) as Timezone,
        options: timezones,
        getOptionLabel: (option: Timezone) => option.label,
        renderInput: ({ helperText, ...params }: TextFieldProps) => (
            <TextField label={label} margin="normal" {...params} />
        ),
        onChange: handleChange,
    });
}
