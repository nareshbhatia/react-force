import React, { Fragment, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { storiesOf } from '@storybook/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { FormActions } from '../FormActions';
import { StoryDecorator } from '../stories';
import { Day, days } from '../test/mock-data';
import { MultiSelectField } from './MultiSelectField';

const ExampleForm = () => {
    const [selectedDays, setSelectedDays] = useState<Array<Day>>([
        days[0],
        days[2],
        days[4],
    ]);

    const validationSchema = yup.object().shape({
        days: yup.array().min(1),
    });

    return (
        <Fragment>
            <Formik
                initialValues={{ selectedDays }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    setSelectedDays(values.selectedDays);
                    actions.setSubmitting(false);
                }}
            >
                {({ resetForm }) => (
                    <Form>
                        <MultiSelectField
                            name="selectedDays"
                            label="Days"
                            options={days}
                            getOptionLabel={(option: Day) => option.name}
                        />
                        <FormActions submitLabel="Save" resetForm={resetForm} />
                    </Form>
                )}
            </Formik>

            <Box mt={4}>
                <Typography variant="h6">Form values</Typography>
                <Typography>
                    Days: {selectedDays.map((day) => day.name).join(', ')}
                </Typography>
            </Box>
        </Fragment>
    );
};

storiesOf('MultiSelectField', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <ExampleForm />);
