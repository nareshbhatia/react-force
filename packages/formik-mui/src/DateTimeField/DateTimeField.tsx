import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import classNames from 'classnames';
import { useField } from 'formik';
import moment from 'moment';
import 'moment-timezone';

const useStyles = makeStyles({
    root: {
        width: 160,
    },
});

export interface DateTimeFieldProps {
    name: string;
    label?: string;
    timezone: string;
    className?: string;
}

export const DateTimeField = ({
    name,
    timezone,
    className: classNameProp,
    ...rest
}: DateTimeFieldProps) => {
    const classes = useStyles();
    const [field, , helpers] = useField(name);

    const m = moment(field.value).tz(timezone);

    const handleChange = (date: MaterialUiPickersDate) => {
        if (date != null) {
            helpers.setValue(date.toDate());
        }
    };

    return (
        <DateTimePicker
            className={classNames(classes.root, classNameProp)}
            name={name}
            value={m}
            format="YYYY-MM-DD hh:mm A"
            onChange={handleChange}
            showTodayButton
            {...rest}
        />
    );
};
