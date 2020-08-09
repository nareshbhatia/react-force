import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { htmlSerializer } from '@nareshbhatia/slate-editor';
import { HtmlView } from '@react-force/core';
import { Form, Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import { FormActions, RichTextField } from '../src';

const useStyles = makeStyles({
    editor: {
        minHeight: 80,
    },
});

const metadata = {
    component: RichTextField,
    title: 'formik/RichTextField',
};
export default metadata;

export const RichTextFieldStory = () => {
    const classes = useStyles();
    const [message, setMessage] = useState('<p>Hello World!</p>');

    return (
        <Fragment>
            <Formik
                initialValues={{ message: htmlSerializer.deserialize(message) }}
                onSubmit={(values, actions) => {
                    setMessage(htmlSerializer.serialize(values.message));
                    actions.setSubmitting(false);
                }}
            >
                {() => (
                    <Form>
                        <RichTextField
                            name="message"
                            label="Message"
                            margin="normal"
                            editorClassName={classes.editor}
                            fullWidth
                        />
                        <FormActions submitLabel="Save" />
                    </Form>
                )}
            </Formik>

            <Box mt={4}>
                <Typography variant="h6">Form values</Typography>
                <HtmlView html={message} />
            </Box>
        </Fragment>
    );
};
RichTextFieldStory.storyName = 'RichTextField';
