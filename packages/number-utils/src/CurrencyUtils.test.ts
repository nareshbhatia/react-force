import { CurrencyUtils } from './CurrencyUtils';

describe('CurrencyUtils', () => {
    describe('toString()', () => {
        it('formats amount and currency as a locale-specific string', () => {
            expect(CurrencyUtils.toString(1000, 'USD')).toBe('$1,000.00');
        });
    });
});
