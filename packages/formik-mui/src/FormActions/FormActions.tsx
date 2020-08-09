import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { ProgressButton } from '@react-force/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        flex: '0 0 auto',
        '& > :not(:first-child)': {
            marginLeft: theme.spacing(1),
        },
    },
}));

export interface FormActionProps {
    submitLabel?: string;
    isSubmitting?: boolean;
}

export const FormActions = ({
    submitLabel = 'Submit',
    isSubmitting = false,
}: FormActionProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ProgressButton
                variant="contained"
                color="primary"
                busy={isSubmitting}
                type="submit"
            >
                {submitLabel}
            </ProgressButton>
            <Button variant="contained" color="secondary" type="reset">
                Cancel
            </Button>
        </div>
    );
};
