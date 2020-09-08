import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { SlateEditor } from '@react-force/slate-editor';
import { useField } from 'formik';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    label: {
        color: theme.palette.text.secondary,
        fontSize: '0.75rem',
        lineHeight: 1,
        marginBottom: theme.spacing(1),
    },
    editorContainer: {
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

/**
 * Formik field to edit HTML content
 * Field value type: string
 * Format: HTML
 */
export const RichTextField = ({
    name,
    label,
    editorClassName,
    ...rest
}: RichTextFieldProps) => {
    const classes = useStyles();
    const [field, meta, helpers] = useField(name);

    const handleChange = (value: any) => {
        helpers.setValue(value);
    };

    return (
        <FormControl {...rest}>
            {label ? <label className={classes.label}>{label}</label> : null}
            <div className={`${classes.editorContainer} ${editorClassName}`}>
                <SlateEditor value={field.value} onChange={handleChange} />
            </div>
            {meta.touched && meta.error ? (
                <FormHelperText error={true}>{meta.error}</FormHelperText>
            ) : null}
        </FormControl>
    );
};
