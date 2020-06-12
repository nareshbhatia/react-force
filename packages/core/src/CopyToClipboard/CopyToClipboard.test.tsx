import React from 'react';
import { fireEvent, render } from '../test';
import { CopyToClipboard } from './CopyToClipboard';

describe('CopyToClipboard', () => {
    it.skip('calls onCopied when clicked', () => {
        // ----- mocks -----
        // TODO: unable to mock clipboard
        // see: https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
        const writeText = jest.spyOn(navigator.clipboard, 'writeText');
        const handleCopied = jest.fn();

        const text = 'https://github.com/nareshbhatia/react-force';

        const { getByText } = render(
            <CopyToClipboard text={text} onCopied={handleCopied} />
        );
        fireEvent.click(getByText('Copy'));

        expect(writeText).toHaveBeenCalledTimes(1);
        expect(writeText).toHaveBeenCalledWith(text);
        expect(handleCopied).toHaveBeenCalledTimes(1);
    });
});
