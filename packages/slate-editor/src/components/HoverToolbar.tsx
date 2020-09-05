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

/**
 * Returns the range of the DOM selection.
 * Returns null if there is no selection.
 */
const getDomSelectionRange = () => {
    const domSelection = window.getSelection();
    if (domSelection === null || domSelection.rangeCount === 0) {
        return null;
    }
    return domSelection.getRangeAt(0);
};

/** Dark theme for the toolbar */
const toolbarTheme = createMuiTheme({
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
                const domRange = getDomSelectionRange();
                if (domRange === null) {
                    return;
                }
                const rect = domRange.getBoundingClientRect();
                setAnchorEl({
                    clientWidth: rect.width,
                    clientHeight: rect.height,
                    /**
                     * This function will be called by the popper to get the
                     * bounding rectangle for the selection. Since the selection
                     * can change when a toolbar button is clicked, we need to
                     * get a fresh selection range before computing the bounding
                     * rect. (see https://stackoverflow.com/questions/63747451)
                     */
                    getBoundingClientRect: () => {
                        const innerDomRange = getDomSelectionRange();
                        return innerDomRange === null
                            ? new DOMRect()
                            : innerDomRange.getBoundingClientRect();
                    },
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
            <ThemeProvider theme={toolbarTheme}>
                <Popper
                    id="toolbar-popper"
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
