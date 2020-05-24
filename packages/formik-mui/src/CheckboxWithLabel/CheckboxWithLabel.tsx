import React from 'react';
import MuiCheckbox from '@material-ui/core/Checkbox';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import { useField } from 'formik';

export const CheckboxWithLabel = ({ ...props }) => {
    const [field] = useField(props.name);

    return (
        <MuiFormControlLabel
            {...props}
            control={<MuiCheckbox {...field} checked={field.value} />}
            label={props.label}
        />
    );
};
