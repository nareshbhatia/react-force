import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

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
}

export const FormActions = ({ submitLabel = 'Submit' }: FormActionProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Button variant="contained" color="primary" type="submit">
                {submitLabel}
            </Button>
            <Button variant="contained" color="secondary" type="reset">
                Cancel
            </Button>
        </div>
    );
};
