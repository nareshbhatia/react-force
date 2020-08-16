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
    const { selection } = editor;
    const isTextSelected =
        ReactEditor.isFocused(editor) &&
        selection !== null &&
        !Range.isCollapsed(selection) &&
        Editor.string(editor, selection) !== '';

    const computeAnchorEl = () => {
        const nativeSelection = window.getSelection();
        const range = nativeSelection!.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        return {
            clientWidth: rect.width,
            clientHeight: rect.height,
            getBoundingClientRect: () => range.getBoundingClientRect(),
        };
    };

    useEffect(() => {
        if (editMode === 'toolbar' && isTextSelected) {
            if (!isToolbarOpen) {
                setToolbarOpen(true);
                setAnchorEl(computeAnchorEl());
            }
        } else {
            setToolbarOpen(false);
        }
    }, [editMode, isToolbarOpen, isTextSelected]);

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
