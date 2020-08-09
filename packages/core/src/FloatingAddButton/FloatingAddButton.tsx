import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React, { MouseEventHandler } from 'react';

const useStyles = makeStyles({
    fab: {
        position: 'absolute',
        right: 30,
        bottom: 20,
    },
});

export interface FloatingAddButtonProps {
    onClick: MouseEventHandler;
}

export const FloatingAddButton = ({ onClick }: FloatingAddButtonProps) => {
    const classes = useStyles();
    return (
        <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={onClick}
        >
            <AddIcon />
        </Fab>
    );
};
