import React from 'react';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { useField } from 'formik';

export interface CheckboxFieldProps {
    name: string;
    renderContainer?: (props: CheckboxProps) => JSX.Element;
}

export const CheckboxField = ({
    name,
    renderContainer = (props) => <Checkbox {...props} />,
}: CheckboxFieldProps) => {
    const [field, , helpers] = useField(name);

    const handleChange = (event: any) => {
        helpers.setValue(event.target.checked);
    };

    return renderContainer({
        color: 'primary',
        checked: field.value,
        onChange: handleChange,
    });
};
