import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Day, days } from '@react-force/mock-data';
import { Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import * as yup from 'yup';
import { FormActions, MultiSelectField } from '../src';

const metadata = {
    component: MultiSelectField,
    title: 'formik/MultiSelectField',
};
export default metadata;

export const MultiSelectFieldStory = () => {
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
                {() => (
                    <Form>
                        <MultiSelectField
                            name="selectedDays"
                            label="Days"
                            options={days}
                            getOptionLabel={(option: Day) => option.name}
                        />
                        <FormActions submitLabel="Save" />
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
MultiSelectFieldStory.storyName = 'MultiSelectField';
