import React from 'react';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { SlateEditor } from '@nareshbhatia/slate-editor';
import { useField, useFormikContext } from 'formik';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme: Theme) => ({
    label: {
        color: theme.palette.text.secondary,
        fontSize: '0.75rem',
        lineHeight: 1,
        marginBottom: theme.spacing(1),
    },
    editorWrapper: {
        borderColor:
            theme.palette.type === 'light'
                ? 'rgba(0, 0, 0, 0.23)'
                : 'rgba(255, 255, 255, 0.23)',
        borderRadius: 2,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: theme.spacing(1),
        background: 'none',
    },
}));

export interface RichTextFieldProps extends FormControlProps {
    name: string;
    label?: string;
    editorClassName?: string;
}

export const RichTextField = ({
    name,
    label,
    editorClassName,
    ...rest
}: RichTextFieldProps) => {
    const classes = useStyles();
    const [field, meta] = useField(name);
    const formik = useFormikContext<any>();

    const handleChange = (option: any) => {
        formik.setFieldValue(name, option.value);
    };

    return (
        <FormControl {...rest}>
            {label ? <label className={classes.label}>{label}</label> : null}
            <div className={classes.editorWrapper}>
                <SlateEditor
                    className={editorClassName}
                    value={field.value}
                    onChange={handleChange}
                />
            </div>
            {meta.touched && meta.error ? (
                <FormHelperText error={true}>{meta.error}</FormHelperText>
            ) : null}
        </FormControl>
    );
};