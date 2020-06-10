import React, { Fragment, useState } from 'react';
import Box from '@material-ui/core/Box';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { storiesOf } from '@storybook/react';
import { Form, Formik } from 'formik';
import { FormActions } from '../FormActions';
import { StoryDecorator } from '../stories';
import { CheckboxField } from './CheckboxField';

const ExampleForm = () => {
    const [isAudioEnabled, setAudioEnabled] = useState(true);
    const [isVideoEnabled, setVideoEnabled] = useState(true);

    // For video checkbox, override color to secondary
    const renderContainerSecondary = (props: CheckboxProps) => (
        <Checkbox {...props} color="secondary" />
    );

    return (
        <Fragment>
            <Formik
                initialValues={{ isAudioEnabled, isVideoEnabled }}
                onSubmit={(values, actions) => {
                    setAudioEnabled(values.isAudioEnabled);
                    setVideoEnabled(values.isVideoEnabled);
                    actions.setSubmitting(false);
                }}
            >
                {({ resetForm }) => (
                    <Form>
                        <FormControlLabel
                            control={<CheckboxField name="isAudioEnabled" />}
                            label="Audio"
                        />
                        <FormControlLabel
                            control={
                                <CheckboxField
                                    name="isVideoEnabled"
                                    renderContainer={renderContainerSecondary}
                                />
                            }
                            label="Video"
                        />
                        <FormActions submitLabel="Save" resetForm={resetForm} />
                    </Form>
                )}
            </Formik>

            <Box mt={4}>
                <Typography variant="h6">Form values</Typography>
                <Typography>
                    isAudioEnabled: {isAudioEnabled ? 'true' : 'false'}
                </Typography>
                <Typography>
                    isVideoEnabled: {isVideoEnabled ? 'true' : 'false'}
                </Typography>
            </Box>
        </Fragment>
    );
};

storiesOf('CheckboxField', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <ExampleForm />);