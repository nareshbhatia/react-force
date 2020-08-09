import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Day, DayEnum, days } from '@react-force/mock-data';
import { Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import { FormActions, SelectField } from '../src';

const metadata = {
    component: SelectField,
    title: 'formik/SelectField',
};
export default metadata;

export const SelectFieldStory = () => {
    const [dayId, setDayId] = useState<DayEnum | undefined>(undefined);
    const selectedDay: Day | undefined =
        dayId !== undefined ? days.find((day) => day.id === dayId) : undefined;

    return (
        <Fragment>
            <Formik
                initialValues={{ dayId }}
                onSubmit={(values, actions) => {
                    setDayId(values.dayId);
                    actions.setSubmitting(false);
                }}
            >
                {({ values }) => (
                    <Form>
                        <SelectField
                            name="dayId"
                            label="Day"
                            options={days}
                            isNullable={true}
                            nullOptionName="None"
                            margin="normal"
                            fullWidth
                        />

                        <Typography variant="body1">{values.dayId}</Typography>

                        <FormActions submitLabel="Save" />
                    </Form>
                )}
            </Formik>

            <Box mt={4}>
                <Typography variant="h6">Selected Day</Typography>
                <Typography>
                    {selectedDay !== undefined ? selectedDay.name : 'None'}
                </Typography>
            </Box>
        </Fragment>
    );
};
SelectFieldStory.storyName = 'SelectField';
