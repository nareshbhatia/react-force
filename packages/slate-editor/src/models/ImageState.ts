import { Range } from 'slate';

export interface ImageState {
    isNew: boolean;
    selection: Range;
    url: string;
    alt: string;
}
