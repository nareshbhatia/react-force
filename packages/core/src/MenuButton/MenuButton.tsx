import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export interface MenuButtonProps<OptionType> {
    /** menu button label */
    buttonLabel: string;

    /** options for the dropdown */
    options: Array<OptionType>;

    /** function to get the label of an option **/
    getOptionLabel: (option: OptionType) => string;

    /** function to indicate that an option was changed */
    onChange: (value: OptionType) => void;
}

export function MenuButton<OptionType>({
    buttonLabel,
    options,
    getOptionLabel,
    onChange,
}: MenuButtonProps<OptionType>): JSX.Element {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        /* istanbul ignore next */
        setAnchorEl(null);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number
    ) => {
        setAnchorEl(null);
        onChange(options[index]);
    };

    // Note: if getContentAnchorEl is not set to null, the menu positioning will
    // not work correctly. See https://github.com/mui-org/material-ui/issues/7961
    return (
        <Fragment>
            <Button
                variant="contained"
                color="primary"
                aria-label="select option"
                aria-controls="dropdown-menu"
                aria-haspopup="true"
                endIcon={<ArrowDropDownIcon />}
                onClick={handleClick}
            >
                {buttonLabel}
            </Button>
            <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom',
                }}
                transformOrigin={{
                    horizontal: 'center',
                    vertical: 'top',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={index}
                        onClick={(event) => handleMenuItemClick(event, index)}
                    >
                        {getOptionLabel(options[index])}
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
}
