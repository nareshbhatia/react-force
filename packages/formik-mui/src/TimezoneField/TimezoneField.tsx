import React from 'react';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { DateUtils } from '@react-force/date-utils';
import { useField, useFormikContext } from 'formik';
import moment from 'moment';
import 'moment-timezone';

const { gmtOffset, tzAbbr } = DateUtils;

interface OptionType {
    value: string;
    label: string;
}

const tzOptions: Array<OptionType> = moment.tz
    .names()
    .map((name) => {
        const now = Date.now();
        const zone = moment.tz.zone(name);
        return { name, offset: zone !== null ? zone.utcOffset(now) : 0 };
    })
    .sort((a, b) =>
        a.offset === b.offset
            ? a.name.localeCompare(b.name)
            : b.offset - a.offset
    )
    .map((zone) => {
        const tz = zone.name;
        return {
            value: zone.name,
            label: `(${gmtOffset(tz)}) ${tz} - ${tzAbbr(tz)}`,
        };
    });

export interface TimezoneFieldProps
    extends Omit<AutocompleteProps<any>, 'options' | 'renderInput'> {
    name: string;
    label?: string;
}

export const TimezoneField = ({ name, label, ...rest }: TimezoneFieldProps) => {
    const [field, meta] = useField(name);
    const formik = useFormikContext<any>();

    const selectedOption = tzOptions.find(
        (option) => option.value === field.value
    );

    const handleChange = (event: any, option: OptionType | null) => {
        formik.setFieldValue(name, option ? option.value : '');
    };

    return (
        <Autocomplete
            value={selectedOption}
            options={tzOptions}
            getOptionLabel={(option) => option.label}
            renderInput={({ helperText, ...params }: TextFieldProps) => (
                <TextField
                    label={label}
                    helperText={
                        meta.touched && meta.error ? meta.error : helperText
                    }
                    error={!!(meta.touched && meta.error)}
                    {...params}
                />
            )}
            autoComplete={true}
            autoHighlight={true}
            clearOnEscape={true}
            onChange={handleChange}
            {...rest}
        />
    );
};
