import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(1),
    },
    label: {
        marginLeft: theme.spacing(0.5),
        fontSize: '1rem',
    },
    options: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}));

export interface MultiSelectChipControlProps<OptionType> {
    label?: string;
    value: Array<OptionType>;
    options: Array<OptionType>;
    getOptionLabel: (option: OptionType) => string;
    onChange: (value: Array<OptionType>) => void;
}

export function MultiSelectChipControl<OptionType>({
    label,
    value,
    options,
    getOptionLabel,
    onChange,
}: MultiSelectChipControlProps<OptionType>) {
    const classes = useStyles();

    const handleClick = (optionClicked: OptionType) => {
        // Transfer old options to newValue excluding the clicked option
        const newValue = [];
        let optionExisted = false;
        value.forEach((option) => {
            if (option === optionClicked) {
                optionExisted = true;
            } else {
                newValue.push(option);
            }
        });

        // If option was not selected earlier, then add it to the new value
        if (!optionExisted) {
            newValue.push(optionClicked);
        }

        onChange(newValue);
    };

    return (
        <div className={classes.root}>
            {label && (
                <Typography variant="subtitle2" className={classes.label}>
                    {label}
                </Typography>
            )}
            <div className={classes.options}>
                {options.map((option) => {
                    return (
                        <Chip
                            key={getOptionLabel(option)}
                            label={getOptionLabel(option)}
                            color={
                                value.includes(option) ? 'primary' : 'default'
                            }
                            className={classes.chip}
                            size="small"
                            clickable
                            onClick={() => {
                                handleClick(option);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
