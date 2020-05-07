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
    value: Array<string>;
    options: Array<any>;
    optionIdAttr?: string;
    optionNameAttr?: string;
    onChange: (value: Array<string>) => void;
}

export function MultiSelectChipControl<OptionType>({
    label,
    value,
    options,
    optionIdAttr = 'id',
    optionNameAttr = 'name',
    onChange,
}: MultiSelectChipControlProps<OptionType>) {
    const classes = useStyles();

    const handleClick = (optionIdClicked: string) => {
        // Transfer old options to newValue excluding the clicked option
        const newValue = [];
        let optionExisted = false;
        value.forEach((optionId) => {
            if (optionId === optionIdClicked) {
                optionExisted = true;
            } else {
                newValue.push(optionId);
            }
        });

        // If option was not selected earlier, then add it to the new value
        if (!optionExisted) {
            newValue.push(optionIdClicked);
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
                    const optionId = option[optionIdAttr];
                    const optionName = option[optionNameAttr];

                    return (
                        <Chip
                            key={optionId}
                            label={optionName}
                            color={
                                value.includes(optionId) ? 'primary' : 'default'
                            }
                            className={classes.chip}
                            size="small"
                            clickable
                            onClick={() => {
                                handleClick(optionId);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}
