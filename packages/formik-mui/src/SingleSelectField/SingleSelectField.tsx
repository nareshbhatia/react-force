import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Autocomplete, {
    AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import { useField } from 'formik';
import React, { ReactNode } from 'react';

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
 * Formik field that returns one option from an array of options
 * Field value type: option (the selected option)
 * options: Array<option> (all options)
 */
export function SingleSelectField<OptionType>({
    name,
    label,
    options,
    getOptionLabel,
    renderContainer = (props) => <Autocomplete {...props} />,
}: SingleSelectFieldProps<OptionType>) {
    const [field, meta, helpers] = useField(name);

    const handleChange = (_event: any, value: any) => {
        helpers.setValue(value);
    };

    return renderContainer({
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
