import React, { Fragment, useState } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Timezone, TzUtils } from '@react-force/date-utils';
import { storiesOf } from '@storybook/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { StoryDecorator } from '../stories';
import { SingleSelectField } from './SingleSelectField';

const { findTimezone, getTimezones } = TzUtils;

// Default timezone
const DefaultTz = 'America/New_York';

const timezones = getTimezones();

const Example = () => {
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
                {({ resetForm, values }) => (
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

                        <Box mt={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Save
                            </Button>
                            &nbsp;
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    resetForm();
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>

            {timezone !== undefined ? (
                <Box mt={6}>
                    <Typography variant="h5">{timezone.label}</Typography>
                </Box>
            ) : null}
        </Fragment>
    );
};

storiesOf('SingleSelectField', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <Example />);
