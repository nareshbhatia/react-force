import React from 'react';
import Autocomplete, { AutocompleteProps } from '@material-ui/lab/Autocomplete';
import { useField, useFormikContext } from 'formik';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

export interface MultiSelectFieldProps<OptionType>
    extends Omit<AutocompleteProps<any>, 'renderInput'> {
    name: string;
    label?: string;
}

export function MultiSelectField<OptionType>({
    name,
    label,
    ...rest
}: MultiSelectFieldProps<OptionType>) {
    const [field, meta] = useField(name);
    const formik = useFormikContext<any>();

    const handleChange = (event: any, value: any) => {
        formik.setFieldValue(name, value);
    };

    return (
        <Autocomplete
            multiple
            disableClearable
            disableCloseOnSelect
            value={field.value}
            renderInput={({ helperText, ...params }: TextFieldProps) => (
                <TextField
                    label={label}
                    helperText={
                        meta.touched && meta.error ? meta.error : helperText
                    }
                    error={!!(meta.touched && meta.error)}
                    margin="normal"
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
}
