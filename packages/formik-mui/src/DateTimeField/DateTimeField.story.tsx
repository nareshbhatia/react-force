import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { DateUtils } from '@react-force/date-utils';
import { storiesOf } from '@storybook/react';
import { Form, Formik } from 'formik';
import * as yup from 'yup';
import { StoryDecorator } from '../stories';
import { DateTimeField } from './DateTimeField';

const { dateToShortDateTimeStr } = DateUtils;

// Default timezone
const DefaultTz = 'America/New_York';

interface FormEntity {
    startTime: Date;
    endTime: Date;
}

const validationSchema = yup.object().shape({
    startTime: yup.date().required(),
    endTime: yup.date().required(),
});

const useStyles = makeStyles((theme: Theme) => ({
    date: {
        marginRight: 12,
    },
    time: {
        width: 80,
        marginRight: theme.spacing(3),
    },
}));

const DateTimeForm = () => {
    const classes = useStyles();

    return (
        <Formik<FormEntity>
            initialValues={{
                startTime: new Date('2019-01-01T14:00:00Z'),
                endTime: new Date('2019-01-01T22:00:00Z'),
            }}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                console.log(
                    'Str Time:',
                    dateToShortDateTimeStr(values.startTime, DefaultTz)
                );
                console.log(
                    'End Time:',
                    dateToShortDateTimeStr(values.endTime, DefaultTz)
                );
                actions.setSubmitting(false);
            }}
        >
            {({ resetForm }) => (
                <Form>
                    <DateTimeField
                        className={classes.date}
                        name="startTime"
                        label="Start Time"
                        timezone={DefaultTz}
                    />
                    <DateTimeField
                        className={classes.date}
                        name="endTime"
                        label="End Time"
                        timezone={DefaultTz}
                    />

                    <Box mt={4}>
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

storiesOf('DateTimeField', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <DateTimeForm />);
