import React from 'react';
import { SelectControl, SelectControlProps } from '@react-force/core';
import { useField } from 'formik';

export interface SelectFieldProps extends SelectControlProps {
    // make name a required prop
    name: string;
}

/**
 * Formik field that returns zero or one option from an array of options
 * Field value type: string
 *   id of the selected option |
 *   blank string if no option was selected |
 *   nullOptionName (e.g. 'None') if no option was selected
 * options: Array<option> (all options)
 *   options should have an 'id' and 'name' field by default
 */
export const SelectField = ({ ...props }: SelectFieldProps) => {
    const [field, meta] = useField(props.name);

    return (
        <SelectControl
            {...field}
            {...props}
            helperText={meta.touched && meta.error ? meta.error : undefined}
            error={!!(meta.touched && meta.error)}
        />
    );
};
