import Box from '@material-ui/core/Box';
import { HtmlView } from '@react-force/core';
import React, { Fragment, useState } from 'react';
import { Node } from 'slate';
import { htmlContent } from '../mock-data/htmlContent';
import {
    deserializeFromHtml,
    removeLineBreaks,
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
    const [value, setValue] = useState<Array<Node>>(initialValue);

    return (
        <Fragment>
            <Box display="flex">
                <Box width="50%" p={2}>
                    <SlateEditor value={value} onChange={setValue} />
                </Box>
                <HtmlView
                    width="50%"
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

const pastingHtmlContent = deserializeFromHtml(
    removeLineBreaks(`
<h5>Pasting HTML</h5>

<p>
Pasting HTML content into the Slate Editor will maintain its formatting.
</p>

<p>
Try it out for yourself! Copy and paste some rendered HTML content (not the
 source code) from another site into this editor and its formatting will be
 preserved.
</p>

<p></p>
`)
);

export const PastingHtmlStory = () => {
    const [value, setValue] = useState<Array<Node>>(pastingHtmlContent);

    return (
        <Box display="flex">
            <Box width="50%" p={2}>
                <SlateEditor value={value} onChange={setValue} />
            </Box>
            <HtmlView
                width="50%"
                p={2}
                bgcolor="#eeeeee"
                html={serializeToHtml(value)}
            />
        </Box>
    );
};
PastingHtmlStory.storyName = 'Pasting HTML';

const pastingImagesAndLinksContent = deserializeFromHtml(
    removeLineBreaks(`
<h5>Pasting Images & Links</h5>

<h6>Images</h6>

<p>
To paste an image into the Slate Editor, copy an image URL and paste it in
 the editor. The URL should end with an image extension such as .png or .jpg.
 Try it out by pasting this URL below:
</p>

<p>
<em>https://cdn.pixabay.com/photo/2016/08/09/21/54/yellowstone-national-park-1581879_1280.jpg</em>
</p>

<p></p>

<h6>Links</h6>

<p>
The easiest way to enter a link into the Slate Editor is to use the link button
 in the floating toolbar. However you can also paste a link from your paste
 buffer. To do this, copy any URL and paste it in the editor while a range is
 selected. Try it out by selecting the word "GraphQL" below and then pasting
 this URL:
</p>

<p>
<em>https://medium.com/naresh-bhatia/graphql-concepts-i-wish-someone-explained-to-me-a-year-ago-514d5b3c0eab</em>
</p>

<p>
GraphQL is a modern approach to access data from one or more data sources.
</p>
`)
);

export const PastingImagesAndLinksStory = () => {
    const [value, setValue] = useState<Array<Node>>(
        pastingImagesAndLinksContent
    );

    return (
        <Box display="flex">
            <Box width="50%" p={2}>
                <SlateEditor value={value} onChange={setValue} />
            </Box>
            <HtmlView
                width="50%"
                p={2}
                bgcolor="#eeeeee"
                html={serializeToHtml(value)}
            />
        </Box>
    );
};
PastingImagesAndLinksStory.storyName = 'Pasting Images & Links';
