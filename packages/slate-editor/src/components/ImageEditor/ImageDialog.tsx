import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import isUrl from 'is-url';
import React, { useState } from 'react';
import { ImageState } from '../../models';

const invalidUrlMessage =
    'Please enter a valid URL, e.g., "http://example.com/test.png".';

export interface ImageDialogProps {
    imageState: ImageState;
    onSave: (url: string, alt: string) => void;
    onRemove: () => void;
    onCancel: () => void;
}

export function ImageDialog({
    imageState,
    onSave,
    onRemove,
    onCancel,
}: ImageDialogProps) {
    const [url, setUrl] = useState(imageState.url);
    const [isUrlTouched, setUrlTouched] = useState(false);
    const [isUrlValid, setUrlValid] = useState(true);
    const [alt, setAlt] = useState(imageState.alt);

    const handleSave = () => {
        if (isUrl(url)) {
            onSave(url, alt);
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
     *   Enter: create image
     *   Esc: cancel
     */
    const handleUrlKeyDown = (event: React.KeyboardEvent) => {
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

    const handleAltChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAlt(event.target.value);
    };

    const handleAltKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSave();
        } else if (event.key === 'Escape') {
            event.preventDefault();
            onCancel();
        }
    };

    return (
        <Dialog open={true} fullWidth={true} maxWidth="sm">
            <DialogTitle>
                {imageState.isNew ? 'Insert Image' : 'Edit Image'}
            </DialogTitle>

            <DialogContent>
                <TextField
                    id="url"
                    label="URL"
                    type="url"
                    value={url}
                    placeholder="Paste or type an image URL..."
                    margin="normal"
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
                    onKeyDown={handleUrlKeyDown}
                />
                <TextField
                    id="alt"
                    label="Alternate Text"
                    value={alt}
                    margin="normal"
                    fullWidth
                    onChange={handleAltChange}
                    onKeyDown={handleAltKeyDown}
                />
            </DialogContent>

            <DialogActions>
                {!imageState.isNew ? (
                    <Box flex={1}>
                        <Button color="primary" onClick={onRemove}>
                            Remove Image
                        </Button>
                    </Box>
                ) : null}
                <Button color="primary" onClick={onCancel}>
                    CANCEL
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
