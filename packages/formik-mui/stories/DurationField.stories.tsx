import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { DateUtils } from '@react-force/date-utils';
import { Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import * as yup from 'yup';
import { DurationField, FormActions } from '../src';

const { durationStrToMillis, formatMillisToDuration } = DateUtils;

const metadata = {
    component: DurationField,
    title: 'formik/DurationField',
};
export default metadata;

export const DurationFieldStory = () => {
    // Duration in millis (initial value 1 hour)
    const [duration, setDuration] = useState<number>(60 * 60 * 1000);

    const validationSchema = yup.object().shape({
        duration: yup.string().required(),
    });

    return (
        <Fragment>
            <Formik
                initialValues={{ duration: formatMillisToDuration(duration) }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    setDuration(durationStrToMillis(values.duration));
                    actions.setSubmitting(false);
                }}
            >
                {({ values }) => (
                    <Form>
                        <DurationField name="duration" label="Duration" />

                        <Typography variant="body1">
                            {values.duration}
                        </Typography>

                        <FormActions submitLabel="Save" />
                    </Form>
                )}
            </Formik>

            <Box mt={4}>
                <Typography variant="h6">Form value in milliseconds</Typography>
                <Typography>
                    {duration} ({formatMillisToDuration(duration)})
                </Typography>
            </Box>
        </Fragment>
    );
};
DurationFieldStory.storyName = 'DurationField';
