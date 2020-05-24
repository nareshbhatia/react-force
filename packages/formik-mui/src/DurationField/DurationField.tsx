import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input, { InputProps } from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { useField } from 'formik';
import MaskedInput from 'react-text-mask';

interface TimeMaskedInputProps {
    inputRef: (ref: HTMLInputElement | null) => void;
}

function TimeMaskedInput(props: TimeMaskedInputProps) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[/\d/, /\d/, ':', /[0-5]/, /\d/]}
            placeholder="hh:mm"
            placeholderChar={'\u2000'}
        />
    );
}

export interface DurationFieldProps extends InputProps {
    // make name a required prop
    name: string;
    label?: string;
}

export const DurationField = ({ className, ...props }: DurationFieldProps) => {
    const [field, meta] = useField(props.name);

    return (
        <FormControl className={className}>
            <InputLabel shrink>{props.label}</InputLabel>
            <Input
                {...field}
                {...props}
                inputComponent={TimeMaskedInput as any}
            />
            {meta.touched && meta.error ? (
                <FormHelperText error={true}>{meta.error}</FormHelperText>
            ) : null}
        </FormControl>
    );
};
