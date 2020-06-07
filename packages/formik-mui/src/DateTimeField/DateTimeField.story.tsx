import React, { Fragment, useState } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DateUtils } from '@react-force/date-utils';
import { storiesOf } from '@storybook/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { FormActions } from '../FormActions';
import { StoryDecorator } from '../stories';
import { DateTimeField } from './DateTimeField';

const { formatToShortDateTime } = DateUtils;

// Defaults
const DefaultTz = 'America/New_York';
const EST0900AM = new Date('2019-01-01T14:00:00Z');
const EST0500PM = new Date('2019-01-01T22:00:00Z');

const useStyles = makeStyles((theme: Theme) => ({
    date: {
        marginRight: 12,
    },
}));

const ExampleForm = () => {
    const classes = useStyles();
    const [startTime, setStartTime] = useState(EST0900AM);
    const [endTime, setEndTime] = useState(EST0500PM);

    const validationSchema = yup.object().shape({
        startTime: yup.date().required(),
        endTime: yup.date().required(),
    });

    return (
        <Fragment>
            <Formik
                initialValues={{ startTime, endTime }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    setStartTime(values.startTime);
                    setEndTime(values.endTime);
                    actions.setSubmitting(false);
                }}
            >
                {({ resetForm }) => (
                    <Form>
                        <DateTimeField
                            className={classes.date}
                            name="startTime"
                            label="Start Time"
                            timezone={DefaultTz}
                        />
                        <DateTimeField
                            className={classes.date}
                            name="endTime"
                            label="End Time"
                            timezone={DefaultTz}
                        />
                        <FormActions submitLabel="Save" resetForm={resetForm} />
                    </Form>
                )}
            </Formik>

            <Box mt={4}>
                <Typography variant="h6">Form values</Typography>
                <Typography>
                    {formatToShortDateTime(startTime, DefaultTz)} -{' '}
                    {formatToShortDateTime(endTime, DefaultTz)}
                </Typography>
            </Box>
        </Fragment>
    );
};

storiesOf('DateTimeField', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <ExampleForm />);
