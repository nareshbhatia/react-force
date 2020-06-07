import React, { ReactNode } from 'react';
import Autocomplete, {
    AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import { useField } from 'formik';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

interface AutocompleteInjectedProps<OptionType> {
    disableClearable: boolean;
    autoComplete: boolean;
    autoHighlight: boolean;
    value: OptionType;
    options: OptionType[];
    getOptionLabel: (option: OptionType) => string;
    renderInput: (params: AutocompleteRenderInputParams) => ReactNode;
    onChange: (
        event: object,
        value: OptionType | OptionType[] | null,
        reason: string
    ) => void;
}

export interface SingleSelectFieldProps<OptionType> {
    name: string;
    label?: string;
    options: OptionType[];
    getOptionLabel: (option: OptionType) => string;
    renderContainer?: (
        props: AutocompleteInjectedProps<OptionType>
    ) => JSX.Element;
}

/**
 * Formik field that selects single option from an array of options.
 */
export function SingleSelectField<OptionType>({
    name,
    label,
    options,
    getOptionLabel,
    renderContainer = (props) => <Autocomplete {...props} />,
}: SingleSelectFieldProps<OptionType>) {
    const [field, meta, helpers] = useField(name);

    const handleChange = (event: any, value: any) => {
        helpers.setValue(value);
    };

    return renderContainer({
        // Ensures a sane value that dependent fields can rely on, e.g a date
        // field might rely on a valid timezone from this field
        disableClearable: true,
        autoComplete: true,
        autoHighlight: true,
        value: field.value,
        options,
        getOptionLabel,
        renderInput: ({ helperText, ...params }: TextFieldProps) => (
            <TextField
                label={label}
                helperText={
                    meta.touched && meta.error ? meta.error : helperText
                }
                error={!!(meta.touched && meta.error)}
                margin="normal"
                {...params}
            />
        ),
        onChange: handleChange,
    });
}
