import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { storiesOf } from '@storybook/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { Day, days } from '../test/mock-data';
import { StoryDecorator } from '../stories';
import { MultiSelectField } from './MultiSelectField';

const TestForm = () => {
    const validationSchema = yup.object().shape({
        days: yup.array().min(1),
    });

    return (
        <Formik
            initialValues={{
                days: [days[0], days[2], days[4]],
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                console.log(values.days);
                actions.setSubmitting(false);
            }}
        >
            {({ resetForm }) => (
                <Form>
                    <MultiSelectField
                        name="days"
                        label="Days"
                        options={days}
                        getOptionLabel={(option: Day) => option.name}
                    />
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
    );
};

storiesOf('MultiSelectField', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <TestForm />);
