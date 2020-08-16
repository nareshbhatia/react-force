import { Range } from 'slate';

export interface LinkState {
    isNew: boolean;
    selection: Range;
    url: string;
    openInNewTab: boolean;
}
