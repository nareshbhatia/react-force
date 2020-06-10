import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select, { SelectProps } from '@material-ui/core/Select';

export interface SelectControlProps extends Omit<SelectProps, 'margin'> {
    classNameRoot?: string;
    fullWidth?: boolean;
    helperText?: string;
    isNullable?: boolean;
    label?: string;
    margin?: 'none' | 'dense' | 'normal';
    nullOptionName?: string;
    options: Array<any>;
    optionIdAttr?: string;
    optionNameAttr?: string;
}

export function SelectControl({
    classNameRoot,
    disabled,
    error,
    fullWidth,
    helperText,
    isNullable = false,
    id,
    label,
    margin,
    nullOptionName = '',
    options,
    optionIdAttr = 'id',
    optionNameAttr = 'name',
    ...rest
}: SelectControlProps) {
    return (
        // TODO: There should not be a need for this div - fix this
        // See https://github.com/mui-org/material-ui/issues/16093
        <div className={classNameRoot}>
            <FormControl
                error={error}
                disabled={disabled}
                margin={margin}
                fullWidth={fullWidth}
            >
                {label ? (
                    <InputLabel htmlFor={id} error={error} disabled={disabled}>
                        {label}
                    </InputLabel>
                ) : null}
                <Select id={id} {...rest}>
                    {isNullable ? (
                        <MenuItem value="">{nullOptionName}</MenuItem>
                    ) : null}
                    {options.map((option) => (
                        <MenuItem
                            key={option[optionIdAttr]}
                            value={option[optionIdAttr]}
                        >
                            {option[optionNameAttr]}
                        </MenuItem>
                    ))}
                </Select>
                {helperText ? (
                    <FormHelperText error={error} disabled={disabled}>
                        {helperText}
                    </FormHelperText>
                ) : null}
            </FormControl>
        </div>
    );
}
