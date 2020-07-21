import React, { Fragment, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { storiesOf } from '@storybook/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { FormActions } from './FormActions';
import { StoryDecorator } from '../stories';
import { TextField } from '../TextField';

const ExampleForm = () => {
    const [email, setEmail] = useState<string>('');

    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
    });

    return (
        <Fragment>
            <Formik
                initialValues={{ email }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    setEmail(values.email);
                    setTimeout(() => {
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {({ isSubmitting, values }) => (
                    <Form>
                        <TextField
                            name="email"
                            type="text"
                            label="Email"
                            margin="normal"
                            fullWidth
                        />

                        <Typography variant="body1">{values.email}</Typography>

                        <FormActions
                            submitLabel="Send Email"
                            isSubmitting={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>

            <Box mt={4}>
                <Typography variant="h6">Form value</Typography>
                <Typography>{email}</Typography>
            </Box>
        </Fragment>
    );
};

storiesOf('Form Actions', module)
    .addDecorator(StoryDecorator)
    .add('Submit Progress', () => <ExampleForm />);
