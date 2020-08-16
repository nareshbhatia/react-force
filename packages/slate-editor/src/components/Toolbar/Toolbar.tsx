import CodeIcon from '@material-ui/icons/Code';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import LinkIcon from '@material-ui/icons/Link';
import React, { Fragment } from 'react';
import { EditMode } from '../../models';
import { BlockButton } from './BlockButton';
import { Heading1Icon } from './Heading1Icon';
import { Heading2Icon } from './Heading2Icon';
import { LinkButton } from './LinkButton';
import { MarkButton } from './MarkButton';

export interface ToolbarProps {
    onEditModeChange: (editMode: EditMode) => void;
}

export const Toolbar = ({ onEditModeChange }: ToolbarProps) => {
    return (
        <Fragment>
            <MarkButton markType="bold" aria-label="bold">
                <FormatBoldIcon />
            </MarkButton>
            <MarkButton markType="italic" aria-label="italic">
                <FormatItalicIcon />
            </MarkButton>
            <MarkButton markType="underline" aria-label="underline">
                <FormatUnderlinedIcon />
            </MarkButton>
            <MarkButton markType="code" aria-label="code">
                <CodeIcon />
            </MarkButton>
            <LinkButton aria-label="link" onEditModeChange={onEditModeChange}>
                <LinkIcon />
            </LinkButton>
            <BlockButton blockType="heading5" aria-label="heading1">
                <Heading1Icon />
            </BlockButton>
            <BlockButton blockType="heading6" aria-label="heading2">
                <Heading2Icon />
            </BlockButton>
            <BlockButton blockType="block-quote" aria-label="block-quote">
                <FormatQuoteIcon />
            </BlockButton>
            <BlockButton blockType="bulleted-list" aria-label="bulleted-list">
                <FormatListBulletedIcon />
            </BlockButton>
            <BlockButton blockType="numbered-list" aria-label="numbered-list">
                <FormatListNumberedIcon />
            </BlockButton>
        </Fragment>
    );
};
