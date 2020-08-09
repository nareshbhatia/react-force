import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { DateUtils } from '@react-force/date-utils';
import { Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import * as yup from 'yup';
import { DateTimeField, FormActions } from '../src';

const { createDate, format: formatDate, formatToShortDateTime } = DateUtils;
const format = 'YYYY-MM-DD hh:mm A';

// Defaults
const EST0900AM = new Date('2019-01-01T14:00:00Z');
const EST0500PM = new Date('2019-01-01T22:00:00Z');

const useStyles = makeStyles((theme: Theme) => ({
    date: {
        width: 175,
        marginRight: 12,
    },
}));

const metadata = {
    component: DateTimeField,
    title: 'formik/DateTimeField',
};
export default metadata;

export const DateTimeFieldStory = () => {
    const classes = useStyles();
    const [startTime, setStartTime] = useState(EST0900AM);
    const [endTime, setEndTime] = useState(EST0500PM);
    const timezone = 'America/New_York';

    const validationSchema = yup.object().shape({
        startTime: yup.string().required(),
        endTime: yup.string().required(),
    });

    return (
        <Fragment>
            <Formik
                initialValues={{
                    startTime: formatDate(startTime, format, timezone),
                    endTime: formatDate(endTime, format, timezone),
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    setStartTime(
                        createDate(values.startTime, format, timezone)
                    );
                    setEndTime(createDate(values.endTime, format, timezone));
                    actions.setSubmitting(false);
                }}
            >
                {() => (
                    <Form>
                        {/* renderContainer is needed only because we want to override marginRight */}
                        <DateTimeField
                            name="startTime"
                            label="Start Time"
                            timezone={timezone}
                            renderContainer={(props) => (
                                <TextField
                                    {...props}
                                    className={classes.date}
                                />
                            )}
                        />
                        <DateTimeField
                            name="endTime"
                            label="End Time"
                            timezone={timezone}
                            renderContainer={(props) => (
                                <TextField
                                    {...props}
                                    className={classes.date}
                                />
                            )}
                        />
                        <FormActions submitLabel="Save" />
                    </Form>
                )}
            </Formik>

            <Box mt={4}>
                <Typography variant="h6">Form values</Typography>
                <Typography>
                    {formatToShortDateTime(startTime, timezone)} -{' '}
                    {formatToShortDateTime(endTime, timezone)}
                </Typography>
            </Box>
        </Fragment>
    );
};
DateTimeFieldStory.storyName = 'DateTimeField';
