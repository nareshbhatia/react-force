import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import * as yup from 'yup';
import { FormActions, TextField } from '../src';

const metadata = {
    component: TextField,
    title: 'formik/TextField',
};
export default metadata;

export const TextFieldStory = () => {
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
                    actions.setSubmitting(false);
                }}
            >
                {({ values }) => (
                    <Form>
                        <TextField
                            name="email"
                            type="text"
                            label="Email"
                            margin="normal"
                            fullWidth
                        />

                        <Typography variant="body1">{values.email}</Typography>

                        <FormActions submitLabel="Save" />
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
TextFieldStory.storyName = 'TextField';
