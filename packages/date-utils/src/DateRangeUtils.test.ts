import { DateRangeUtils } from './DateRangeUtils';

const { isOverlapping } = DateRangeUtils;

const PST0900ISO = '2020-01-01T09:00:00.000-08:00';
const PST0930ISO = '2020-01-01T09:30:00.000-08:00';
const PST1000ISO = '2020-01-01T10:00:00.000-08:00';
const PST1030ISO = '2020-01-01T10:30:00.000-08:00';
const PST1100ISO = '2020-01-01T11:00:00.000-08:00';
const PST0900 = new Date(PST0900ISO);
const PST0930 = new Date(PST0930ISO);
const PST1000 = new Date(PST1000ISO);
const PST1030 = new Date(PST1030ISO);
const PST1100 = new Date(PST1100ISO);

describe('DateRangeUtils', () => {
    describe('isOverlapping()', () => {
        it('returns true if two date ranges are overlapping', () => {
            expect(isOverlapping(PST0900, PST1000, PST0930, PST1030)).toBe(
                true
            );
        });

        it('returns false if two date ranges are not overlapping', () => {
            expect(isOverlapping(PST0900, PST1000, PST1030, PST1100)).toBe(
                false
            );
        });

        it('returns false if two date ranges are touching', () => {
            expect(isOverlapping(PST0900, PST1000, PST1000, PST1030)).toBe(
                false
            );
        });
    });
});
