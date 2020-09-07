import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import isUrl from 'is-url';
import React, { useState } from 'react';
import { LinkState } from '../models';

const invalidUrlMessage =
    'Please enter a valid URL, e.g., "http://google.com".';

export interface LinkEditorProps {
    linkState: LinkState;
    onSave: (url: string, openInNewTab: boolean) => void;
    onRemove: () => void;
    onCancel: () => void;
}

export function LinkEditor({
    linkState,
    onSave,
    onRemove,
    onCancel,
}: LinkEditorProps) {
    const [url, setUrl] = useState(linkState.url);
    const [isUrlTouched, setUrlTouched] = useState(false);
    const [isUrlValid, setUrlValid] = useState(true);
    const [openInNewTab, setOpenInNewTab] = useState(linkState.openInNewTab);

    const handleSave = () => {
        if (isUrl(url)) {
            onSave(url, openInNewTab);
        }
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = event.target.value;
        setUrl(newUrl);
        setUrlValid(isUrl(newUrl));
    };

    const handleUrlBlur = () => {
        setUrlTouched(true);
    };

    /**
     * React to special keys:
     *   Enter: create link
     *   Esc: cancel
     */
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setUrlTouched(true);
            setUrlValid(isUrl(url));
            handleSave();
        } else if (event.key === 'Escape') {
            event.preventDefault();
            onCancel();
        }
    };

    const handleOpenInNewTabChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setOpenInNewTab(event.target.checked);
    };

    return (
        <Dialog open={true} fullWidth={true} maxWidth="sm" onClose={onCancel}>
            <DialogTitle>
                {linkState.isNew ? 'Insert Link' : 'Edit Link'}
            </DialogTitle>

            <DialogContent>
                <TextField
                    id="url"
                    label="URL"
                    type="url"
                    value={url}
                    placeholder="Paste or type a link..."
                    fullWidth
                    autoFocus
                    error={isUrlTouched && !isUrlValid}
                    helperText={
                        isUrlTouched && !isUrlValid
                            ? invalidUrlMessage
                            : undefined
                    }
                    onChange={handleUrlChange}
                    onBlur={handleUrlBlur}
                    onKeyDown={handleKeyDown}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={openInNewTab}
                            name="openInNewTab"
                            color="primary"
                            onChange={handleOpenInNewTabChange}
                        />
                    }
                    label="Open in new tab"
                />
            </DialogContent>

            <DialogActions>
                {!linkState.isNew ? (
                    <Box flex={1}>
                        <Button color="primary" onClick={onRemove}>
                            Remove Link
                        </Button>
                    </Box>
                ) : null}
                <Button color="primary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={handleSave}
                    disabled={url.length === 0 || !isUrlValid}
                >
                    SAVE
                </Button>
            </DialogActions>
        </Dialog>
    );
}
