import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { DefaultTz } from '@react-force/date-utils';
import { Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import * as yup from 'yup';
import { FormActions, TimezoneField } from '../src';

const metadata = {
    component: TimezoneField,
    title: 'formik/TimezoneField',
};
export default metadata;

export const TimezoneFieldStory = () => {
    const [timezone, setTimezone] = useState<string>(DefaultTz);

    const validationSchema = yup.object().shape({
        timezone: yup.string().required(),
    });

    return (
        <Fragment>
            <Formik
                initialValues={{ timezone }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    setTimezone(values.timezone);
                    actions.setSubmitting(false);
                }}
            >
                {({ values }) => (
                    <Form>
                        <TimezoneField name="timezone" label="Time Zone" />

                        <Typography variant="body1">
                            {values.timezone}
                        </Typography>

                        <FormActions submitLabel="Save" />
                    </Form>
                )}
            </Formik>

            <Box mt={4}>
                <Typography variant="h6">Form value</Typography>
                <Typography>{timezone}</Typography>
            </Box>
        </Fragment>
    );
};
TimezoneFieldStory.storyName = 'TimezoneField';
