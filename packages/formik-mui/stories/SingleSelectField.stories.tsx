import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Timezone, TzUtils } from '@react-force/date-utils';
import { Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import * as yup from 'yup';
import { FormActions, SingleSelectField } from '../src';

const { findTimezone, getTimezones } = TzUtils;

// Default timezone
const DefaultTz = 'America/New_York';

const timezones = getTimezones();

const metadata = {
    component: SingleSelectField,
    title: 'formik/SingleSelectField',
};
export default metadata;

export const SingleSelectFieldStory = () => {
    const [timezone, setTimezone] = useState<Timezone | undefined>(
        findTimezone(timezones, DefaultTz)
    );

    const validationSchema = yup.object().shape({
        timezone: yup.mixed().required('Time zone is required'),
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
                        <SingleSelectField
                            name="timezone"
                            label="Time Zone"
                            options={timezones}
                            getOptionLabel={(option: Timezone) => option.label}
                        />

                        <Typography variant="body1">
                            {values.timezone ? values.timezone.label : 'null'}
                        </Typography>

                        <FormActions submitLabel="Save" />
                    </Form>
                )}
            </Formik>

            <Box mt={4}>
                <Typography variant="h6">Form value</Typography>
                {timezone !== undefined ? (
                    <Typography>{timezone.label}</Typography>
                ) : null}
            </Box>
        </Fragment>
    );
};
SingleSelectFieldStory.storyName = 'SingleSelectField';
