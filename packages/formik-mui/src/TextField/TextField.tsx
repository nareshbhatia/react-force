import React from 'react';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
import { useField } from 'formik';

export const TextField = ({ helperText, ...props }: TextFieldProps) => {
    // @ts-ignore
    const [field, meta] = useField(props.name);

    return (
        <MuiTextField
            {...field}
            {...props}
            helperText={meta.touched && meta.error ? meta.error : helperText}
            error={!!(meta.touched && meta.error)}
        />
    );
};
