import { deserializeFromHtml } from '../src';

describe('deserializeFromHtml', () => {
    it('deserializes a heading correctly', () => {
        const input = '<h1>Headline 1</h1>';

        const output = [
            {
                type: 'heading1',
                children: [{ text: 'Headline 1' }],
            },
        ];

        expect(deserializeFromHtml(input)).toEqual(output);
    });

    it('deserializes an empty paragraph correctly', () => {
        const input = '<p></p>';

        const output = [
            {
                type: 'paragraph',
                children: [],
            },
        ];

        expect(deserializeFromHtml(input)).toEqual(output);
    });

    it('deserializes a paragraph with text correctly', () => {
        const input = '<p>Hello</p>';

        const output = [
            {
                type: 'paragraph',
                children: [
                    {
                        text: 'Hello',
                    },
                ],
            },
        ];

        expect(deserializeFromHtml(input)).toEqual(output);
    });

    it('deserializes a single mark correctly', () => {
        const input = '<p><strong>Bold</strong></p>';

        const output = [
            {
                type: 'paragraph',
                children: [{ text: 'Bold', bold: true }],
            },
        ];

        expect(deserializeFromHtml(input)).toEqual(output);
    });

    it('deserializes multiple marks correctly', () => {
        const input = '<p><em><strong>Bold and italic</strong></em></p>';

        const output = [
            {
                type: 'paragraph',
                children: [
                    { text: 'Bold and italic', bold: true, italic: true },
                ],
            },
        ];

        expect(deserializeFromHtml(input)).toEqual(output);
    });

    it('deserializes a link correctly', () => {
        const input =
            '<p><a href="https://google.com" target="_blank">Google</a></p>';

        const output = [
            {
                type: 'paragraph',
                children: [
                    {
                        type: 'link',
                        url: 'https://google.com',
                        openInNewTab: true,
                        children: [{ text: 'Google' }],
                    },
                ],
            },
        ];

        expect(deserializeFromHtml(input)).toEqual(output);
    });

    it('deserializes an image correctly', () => {
        const input = '<img src="https://example.com/lion.png" alt="Lion" />';

        const output = [
            {
                type: 'image',
                url: 'https://example.com/lion.png',
                alt: 'Lion',
                children: [],
            },
        ];

        expect(deserializeFromHtml(input)).toEqual(output);
    });

    it('deserializes a bulleted list correctly', () => {
        const input = '<ul><li>Bullet 1</li><li>Bullet 2</li></ul>';

        const output = [
            {
                type: 'bulleted-list',
                children: [
                    {
                        type: 'list-item',
                        children: [{ text: 'Bullet 1' }],
                    },
                    {
                        type: 'list-item',
                        children: [{ text: 'Bullet 2' }],
                    },
                ],
            },
        ];

        expect(deserializeFromHtml(input)).toEqual(output);
    });

    it('deserializes a numbered list correctly', () => {
        const input = '<ol><li>Bullet 1</li><li>Bullet 2</li></ol>';

        const output = [
            {
                type: 'numbered-list',
                children: [
                    {
                        type: 'list-item',
                        children: [{ text: 'Bullet 1' }],
                    },
                    {
                        type: 'list-item',
                        children: [{ text: 'Bullet 2' }],
                    },
                ],
            },
        ];

        expect(deserializeFromHtml(input)).toEqual(output);
    });

    it('deserializes a block quote correctly', () => {
        const input = '<blockquote>United we stand</blockquote>';

        const output = [
            {
                type: 'block-quote',
                children: [
                    {
                        text: 'United we stand',
                    },
                ],
            },
        ];

        expect(deserializeFromHtml(input)).toEqual(output);
    });

    it('deserializes a pre correctly', () => {
        const input = '<pre>const total = price * quantity</pre>';

        const output = [
            {
                type: 'pre',
                children: [
                    {
                        text: 'const total = price * quantity',
                    },
                ],
            },
        ];

        expect(deserializeFromHtml(input)).toEqual(output);
    });
});
