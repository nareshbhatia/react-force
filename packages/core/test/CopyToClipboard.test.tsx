import React from 'react';
import { CopyToClipboard } from '../src';
import { fireEvent, render, waitFor } from './utils';

// jsdom does not define clipboard. It should be defined before spying on it.
// see: https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
Object.assign(navigator, {
    clipboard: {
        writeText: () => {},
    },
});

// ----- mocks -----
const writeText = jest.spyOn(navigator.clipboard, 'writeText');
const handleCopied = jest.fn();

// Text to be copied
const text = 'https://github.com/nareshbhatia/react-force';

describe('CopyToClipboard', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls clipboard.writeText() when clicked', async () => {
        const { getByText } = render(<CopyToClipboard text={text} />);
        fireEvent.click(getByText('Copy'));

        expect(writeText).toHaveBeenCalledTimes(1);
        expect(writeText).toHaveBeenCalledWith(text);
    });

    it('calls onCopied() when clicked', async () => {
        const { getByText } = render(
            <CopyToClipboard text={text} onCopied={handleCopied} />
        );
        fireEvent.click(getByText('Copy'));

        expect(writeText).toHaveBeenCalledTimes(1);
        expect(writeText).toHaveBeenCalledWith(text);
        await waitFor(() => expect(handleCopied).toHaveBeenCalledTimes(1));
    });
});
