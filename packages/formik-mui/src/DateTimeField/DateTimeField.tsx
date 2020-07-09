import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { DateUtils } from '@react-force/date-utils';
import { useField } from 'formik';

const { createDate, format: formatDate, validateDateString } = DateUtils;

const useStyles = makeStyles(() => ({
    root: {
        // 175px is need to fit the placeholder
        width: 175,
    },
}));

export interface DateTimeFieldProps {
    name: string;
    timezone: string;
    label?: string;

    /** moment compatible format */
    format?: string;

    /** placeholder for display (because moment's format can't contain 'AM' - only 'A') */
    placeholder?: string;

    renderContainer?: (props: TextFieldProps) => JSX.Element;
}

/**
 * Formik field to enter date and time. Relies on moment's parsing functions to allow
 * flexible input, e.g. `2020-4-15` will be interpreted as `2020-04-15 12:00 AM`.
 * Time zone aware.
 *
 * Field value type: string
 * Format: As specified by the format prop (conforms to moment's format specification)
 *   Example:
 *     Format: 'YYYY-MM-DD hh:mm A'
 *     Value:  '2020-04-15 12:00 AM'
 */
export const DateTimeField = ({
    name,
    timezone,
    label,
    format = 'YYYY-MM-DD hh:mm A',
    placeholder = 'yyyy-mm-dd hh:mm am',
    renderContainer = (props) => <TextField {...props} />,
}: DateTimeFieldProps) => {
    const classes = useStyles();
    const validate = (value: string) => {
        return validateDateString(value, format, timezone);
    };
    const [field, meta, helpers] = useField({
        name,
        validate,
    });

    /** formats field value onBlur and forces a validation */
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        try {
            const date = createDate(field.value, format, timezone);
            const dateStr = formatDate(date, format, timezone);
            helpers.setValue(dateStr);
        } catch (error) {
            // Eat error. Let validation take care of it.
        }

        // Run field's onBlur method to force validation
        field.onBlur(event);
    };

    return renderContainer({
        ...field,
        label: label,
        className: classes.root,
        placeholder,
        helperText: meta.touched && meta.error ? meta.error : undefined,
        error: !!(meta.touched && meta.error),
        onBlur: handleBlur,
    });
};
