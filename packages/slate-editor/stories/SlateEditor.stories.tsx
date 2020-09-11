import Box from '@material-ui/core/Box';
import { HtmlView } from '@react-force/core';
import React, { Fragment, useState } from 'react';
import { Node } from 'slate';
import { htmlContent } from '../mock-data/htmlContent';
import {
    deserializeFromHtml,
    EmptyDocument,
    serializeToHtml,
    SlateEditor,
} from '../src';

const metadata = {
    component: SlateEditor,
    title: 'Slate Editor/SlateEditor',
    parameters: {
        layout: 'fullscreen',
    },
};
export default metadata;

const initialValue = deserializeFromHtml(htmlContent);

export const SlateEditorStory = () => {
    const [value, setValue] = useState<Array<Node>>(EmptyDocument);

    return (
        <Fragment>
            <Box display="flex">
                <Box flex={1} p={2}>
                    <SlateEditor
                        initialValue={initialValue}
                        value={value}
                        onChange={setValue}
                    />
                </Box>
                <HtmlView
                    flex={1}
                    p={2}
                    bgcolor="#eeeeee"
                    html={serializeToHtml(value)}
                />
            </Box>
            <Box
                flex={1}
                p={2}
                bgcolor="text.secondary"
                color="background.paper"
            >
                {serializeToHtml(value)}
            </Box>
        </Fragment>
    );
};
SlateEditorStory.storyName = 'SlateEditor';
