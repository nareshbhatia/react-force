import React, { useEffect, useState } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { ImageState } from '../../models';
import { getImage } from '../../queries';
import { insertImage, removeImage, updateImage } from '../../transforms';
import { ImageDialog } from './ImageDialog';

export interface ImageEditorProps {
    onClose: () => void;
}

export function ImageEditor({ onClose }: ImageEditorProps) {
    const [imageState, setImageState] = useState<ImageState | undefined>();

    const editor = useSlate();
    const { selection } = editor;

    useEffect(() => {
        if (selection !== null) {
            const image = getImage(editor);
            const isNew = image === undefined;
            setImageState({
                isNew,
                selection,
                url: isNew ? '' : (image?.url as string),
                alt: isNew ? '' : (image?.alt as string),
            });
        }
    }, [editor, selection]);

    const handleImageCancel = () => {
        if (imageState !== undefined) {
            // reselect in editor because dialog takes away focus
            ReactEditor.focus(editor);
            Transforms.select(editor, imageState.selection);
        }
        onClose();
    };

    const handleImageRemove = () => {
        if (imageState !== undefined) {
            // reselect in editor because dialog takes away focus
            ReactEditor.focus(editor);
            Transforms.select(editor, imageState.selection);

            // remove image
            removeImage(editor);
        }
        onClose();
    };

    const handleImageSave = (url: string, alt: string) => {
        if (imageState !== undefined) {
            // reselect in editor because dialog takes away focus
            ReactEditor.focus(editor);
            Transforms.select(editor, imageState.selection);

            // insert image
            imageState.isNew
                ? insertImage(editor, url, alt)
                : updateImage(editor, url, alt);
        }
        onClose();
    };

    if (imageState === undefined) {
        return null;
    }

    return (
        <ImageDialog
            imageState={imageState}
            onCancel={handleImageCancel}
            onRemove={handleImageRemove}
            onSave={handleImageSave}
        />
    );
}
