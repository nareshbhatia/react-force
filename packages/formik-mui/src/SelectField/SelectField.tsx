import React from 'react';
import { useField } from 'formik';
import { SelectControl, SelectControlProps } from '../SelectControl';

export interface SelectFieldProps extends SelectControlProps {
    // make name a required prop
    name: string;
}

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
