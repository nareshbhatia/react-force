import React, { Fragment, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { DefaultTz } from '@react-force/date-utils';
import { storiesOf } from '@storybook/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { FormActions } from '../FormActions';
import { StoryDecorator } from '../stories';
import { TimezoneField } from './TimezoneField';

const ExampleForm = () => {
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
                {({ resetForm, values }) => (
                    <Form>
                        <TimezoneField name="timezone" label="Time Zone" />

                        <Typography variant="body1">
                            {values.timezone}
                        </Typography>

                        <FormActions submitLabel="Save" resetForm={resetForm} />
                    </Form>
                )}
            </Formik>

            <Box mt={4}>
                <Typography variant="h6">Form values</Typography>
                <Typography>{timezone}</Typography>
            </Box>
        </Fragment>
    );
};

storiesOf('TimezoneField', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <ExampleForm />);
