import React, { ReactNode } from 'react';
import Autocomplete, {
    AutocompleteRenderInputParams,
} from '@material-ui/lab/Autocomplete';
import { useField } from 'formik';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

interface AutocompleteInjectedProps<OptionType> {
    multiple: boolean;
    disableClearable: boolean;
    disableCloseOnSelect: boolean;
    autoComplete: boolean;
    autoHighlight: boolean;
    value: OptionType[];
    options: OptionType[];
    getOptionLabel: (option: OptionType) => string;
    renderInput: (params: AutocompleteRenderInputParams) => ReactNode;
    onChange: (
        event: object,
        value: OptionType | OptionType[] | null,
        reason: string
    ) => void;
}

export interface MultiSelectFieldProps<OptionType> {
    name: string;
    label?: string;
    options: Array<OptionType>;
    getOptionLabel: (option: OptionType) => string;
    renderContainer?: (
        props: AutocompleteInjectedProps<OptionType>
    ) => JSX.Element;
}

/**
 * Formik field that provides multiple values for an array.
 *
 * Uses Material-UI's <Autocomplete> component for multiple selections.
 * The key prop to focus on is `renderContainer` which is the function
 * responsible for rendering the Autocomplete (see the default value of
 * this function: (props) => <Autocomplete {...props} />).
 *
 * The idea here is that the default use of <MultiSelectField> should be
 * very easy, however developers should be able to customize the behavior
 * of Autocomplete. For example, to show the AutoComplete in small size,
 * all you would have to do is to override renderContainer to pass
 * an extra prop:
 *
 * <MultiSelectField
 *     name="days"
 *     label="Days"
 *     options={days}
 *     getOptionLabel={(option: Day) => option.name}
 *     renderContainer={(props) => <Autocomplete {...props} size="small" />}
 * />
 *
 * Rest of the props (name, label, options & getOptionLabel) simply provide
 * the application specific content to renderContainer.
 *
 * This is a nice application of the "Render Prop" pattern. For details, see
 * https://blog.andrewbran.ch/polymorphic-react-components/
 *
 * @param name
 * @param label
 * @param options
 * @param getOptionLabel
 * @param renderContainer
 */
export function MultiSelectField<OptionType>({
    name,
    label,
    options,
    getOptionLabel,
    renderContainer = (props) => <Autocomplete {...props} />,
}: MultiSelectFieldProps<OptionType>) {
    const [field, meta, helpers] = useField(name);

    const handleChange = (event: any, value: any) => {
        helpers.setValue(value);
    };

    return renderContainer({
        multiple: true,
        disableClearable: true,
        disableCloseOnSelect: true,
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
