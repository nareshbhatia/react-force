import React from 'react';
import { ProgressButton } from '../src';
import { render } from './utils';

describe('ProgressButton', () => {
    it('shows no progressbar when busy is false', () => {
        const { queryByRole } = render(<ProgressButton busy={false} />);
        expect(queryByRole('progressbar')).toBeNull();
    });

    it('shows a progressbar when busy is true', () => {
        const { queryByRole } = render(<ProgressButton busy={true} />);
        expect(queryByRole('progressbar')).toBeDefined();
    });
});
