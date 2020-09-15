import isHotkey from 'is-hotkey';
import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Node } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';
import { Element, HoverToolbar, Leaf, ImageEditor } from './components';
import { withHtml, withImages, withLinks } from './plugins';
import { toggleMark } from './transforms';

const HOTKEYS: { [key: string]: string } = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
};

const IMAGE_KEY = 'mod+k';

export interface SlateEditorProps {
    value: Array<Node>;
    onChange: (value: Array<Node>) => void;
}

export const SlateEditor = ({ value, onChange }: SlateEditorProps) => {
    // Ensure the following order of precedence for the plugins:
    //   withImages > withLinks > withHtml
    const editor = useMemo(
        () =>
            withImages(
                withLinks(withHtml(withHistory(withReact(createEditor()))))
            ),
        []
    );
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const [isImageEditorOpen, setImageEditorOpen] = useState(false);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        // @ts-ignore
        if (isHotkey(IMAGE_KEY, event)) {
            setImageEditorOpen(true);
            return;
        }

        for (const hotkey in HOTKEYS) {
            // @ts-ignore
            if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
            }
        }
    };

    const handleImageEditorClose = () => {
        setImageEditorOpen(false);
    };

    return (
        <Slate editor={editor} value={value} onChange={onChange}>
            <HoverToolbar />

            {isImageEditorOpen ? (
                <ImageEditor onClose={handleImageEditorClose} />
            ) : null}

            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                spellCheck
                onKeyDown={handleKeyDown}
            />
        </Slate>
    );
};
