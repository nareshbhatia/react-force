import { Node } from 'slate';

export const EmptyDocument: Array<Node> = [
    {
        type: 'paragraph',
        children: [
            {
                text: '',
            },
        ],
    },
];
