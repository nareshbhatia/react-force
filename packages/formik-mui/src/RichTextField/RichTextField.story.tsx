import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { htmlSerializer } from '@nareshbhatia/slate-editor';
import { storiesOf } from '@storybook/react';
import { Form, Formik } from 'formik';
import { StoryDecorator } from '../stories';
import { RichTextField } from './RichTextField';

const useStyles = makeStyles({
    editor: {
        minHeight: 80,
    },
});

const TestForm = () => {
    const classes = useStyles();

    return (
        <Formik
            initialValues={{
                message: htmlSerializer.deserialize('<p>Hello World!</p>'),
            }}
            onSubmit={(values, actions) => {
                console.log(htmlSerializer.serialize(values.message));
                actions.setSubmitting(false);
            }}
        >
            {({ resetForm }) => (
                <Box p={1}>
                    <Form>
                        <RichTextField
                            name="message"
                            label="Message"
                            margin="normal"
                            editorClassName={classes.editor}
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

storiesOf('RichTextField', module)
    .addDecorator(StoryDecorator)
    .add('Example', () => <TestForm />);
