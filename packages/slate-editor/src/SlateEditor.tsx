import isHotkey from 'is-hotkey';
import React, { useCallback, useEffect, useMemo } from 'react';
import { createEditor, Editor, Node } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';
import { Element, HoverToolbar, Leaf } from './components';
import { withImages, withLinks } from './plugins';
import { toggleMark } from './transforms';

const HOTKEYS: { [key: string]: string } = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
};

export interface SlateEditorProps {
    initialValue: Array<Node>;
    value: Array<Node>;
    onChange: (value: Array<Node>) => void;
}

export const SlateEditor = ({
    initialValue,
    value,
    onChange,
}: SlateEditorProps) => {
    const editor = useMemo(
        () => withImages(withLinks(withHistory(withReact(createEditor())))),
        []
    );
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

    useEffect(() => {
        editor.children = initialValue;
        Editor.normalize(editor, { force: true });
    }, [editor, initialValue]);

    return (
        <Slate editor={editor} value={value} onChange={onChange}>
            <HoverToolbar />
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                spellCheck
                onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                        // @ts-ignore
                        if (isHotkey(hotkey, event)) {
                            event.preventDefault();
                            const mark = HOTKEYS[hotkey];
                            toggleMark(editor, mark);
                        }
                    }
                }}
            />
        </Slate>
    );
};
