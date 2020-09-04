import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Popper, { PopperProps } from '@material-ui/core/Popper';
import {
    createMuiTheme,
    makeStyles,
    ThemeProvider,
} from '@material-ui/core/styles';
import React, { Fragment, useEffect, useState } from 'react';
import { Editor, Range, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { EditMode, LinkState } from '../models';
import { getLink } from '../queries';
import { insertLink, unwrapLink } from '../transforms';
import { LinkEditor } from './LinkEditor';
import { Toolbar } from './Toolbar';

// Dark theme for the menu
const menuTheme = createMuiTheme({
    palette: {
        type: 'dark',
        background: {
            paper: '#303030',
        },
    },
});

const useStyles = makeStyles(() => ({
    paper: {
        margin: '4px',
    },
}));

export const HoverToolbar = () => {
    const classes = useStyles();
    const [editMode, setEditMode] = useState<EditMode>('toolbar');
    const [isToolbarOpen, setToolbarOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<PopperProps['anchorEl']>(null);
    const [linkState, setLinkState] = useState<LinkState | undefined>();

    const editor = useSlate();

    // Compute editor selection string
    // This is to trigger useEffect even when the content of the selection
    // object changes without the object itself changing.
    const { selection } = editor;
    const selectionStr = JSON.stringify(selection);

    // Compute isTextSelected
    // This is to simply trigger the opening of the toolbar when text is selected
    const isTextSelected =
        ReactEditor.isFocused(editor) &&
        selection !== null &&
        !Range.isCollapsed(selection) &&
        Editor.string(editor, selection) !== '';

    useEffect(() => {
        if (editMode === 'toolbar') {
            if (isTextSelected) {
                const domSelection = window.getSelection();
                if (domSelection === null || domSelection.rangeCount === 0) {
                    return;
                }
                const domRange = domSelection.getRangeAt(0);
                const rect = domRange.getBoundingClientRect();
                setAnchorEl({
                    clientWidth: rect.width,
                    clientHeight: rect.height,
                    getBoundingClientRect: () =>
                        domRange.getBoundingClientRect(),
                });
                setToolbarOpen(true);
            } else {
                setToolbarOpen(false);
            }
        } else {
            setToolbarOpen(false);
        }
    }, [editMode, isTextSelected, selection, selectionStr]);

    const handleEditModeChanged = (editMode: EditMode) => {
        setEditMode(editMode);
        if (editMode === 'link' && selection !== null) {
            const link = getLink(editor);
            const isNew = link === undefined;
            setLinkState({
                isNew,
                selection,
                url: isNew ? '' : (link?.url as string),
                openInNewTab: isNew ? true : (link?.openInNewTab as boolean),
            });
        }
    };

    const handleLinkCancel = () => {
        if (linkState !== undefined) {
            // reselect in editor because dialog takes away focus
            ReactEditor.focus(editor);
            Transforms.select(editor, linkState.selection);
        }
        setEditMode('toolbar');
    };

    const handleLinkRemove = () => {
        if (linkState !== undefined) {
            // reselect in editor because dialog takes away focus
            ReactEditor.focus(editor);
            Transforms.select(editor, linkState.selection);

            // remove link
            unwrapLink(editor);
        }
        setEditMode('toolbar');
    };

    const handleLinkSave = (url: string, openInNewTab: boolean) => {
        if (linkState !== undefined) {
            // reselect in editor because dialog takes away focus
            ReactEditor.focus(editor);
            Transforms.select(editor, linkState.selection);

            // insert link
            insertLink(editor, url, openInNewTab);
        }
        setEditMode('toolbar');
    };

    return (
        <Fragment>
            <ThemeProvider theme={menuTheme}>
                <Popper
                    id="menu-popper"
                    open={isToolbarOpen}
                    anchorEl={anchorEl}
                    placement="top"
                    transition
                >
                    {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <Paper className={classes.paper}>
                                <Toolbar
                                    onEditModeChange={handleEditModeChanged}
                                />
                            </Paper>
                        </Fade>
                    )}
                </Popper>
            </ThemeProvider>

            {editMode === 'link' && linkState !== undefined ? (
                <LinkEditor
                    linkState={linkState}
                    onCancel={handleLinkCancel}
                    onRemove={handleLinkRemove}
                    onSave={handleLinkSave}
                />
            ) : null}
        </Fragment>
    );
};
