import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { storiesOf } from '@storybook/react';
import { Form, Formik } from 'formik';
import { Day, days } from '../test/mock-data';
import { StoryDecorator } from '../stories';
import { MultiSelectField } from './MultiSelectField';

const TestForm = () => {
    return (
        <Formik
            initialValues={{
                days: [days[0], days[2], days[4]],
            }}
            onSubmit={(values, actions) => {
                console.log(values.days);
                actions.setSubmitting(false);
            }}
        >
            {({ resetForm }) => (
                <Box p={1}>
                    <Form>
                        <MultiSelectField
                            name="days"
                            label="Days"
                            options={days}
                            getOptionLabel={(option: Day) => option.name}
                            fullWidth
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
                </Box>
            )}
        </Formik>
    );
};

storiesOf('MultiSelectField', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <TestForm />);
