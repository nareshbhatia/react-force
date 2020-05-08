import { DateUtils } from './DateUtils';

const {
    adjustToStartOfHour,
    compare,
    computeDate,
    dateToDayDate,
    dateToLongDateTimeStr,
    dateToShortDateTimeStr,
    dateToTimeStr,
    dateToFullTimeStr,
    dateToISODateString,
    dateToISODateTimeString,
    dateRangeToDateRangeString,
    dateRangeToLongTimeRangeString,
    dateRangeToShortTimeRangeString,
    isEqual,
    gmtOffset,
    millisToDurationStr,
    millisToISODuration,
    durationStrToMillis,
    startOfToday,
    tzAbbr,
} = DateUtils;

const PacificTz = 'America/Los_Angeles';
const PST0000ISO = '2020-01-01T00:00:00.000-08:00';
const PST0900ISO = '2020-01-01T09:00:00.000-08:00';
const PST0930ISO = '2020-01-01T09:30:00.000-08:00';
const PST0900ISO_NEXT_DAY = '2020-01-02T09:00:00.000-08:00';
const PST0000 = new Date(PST0000ISO);
const PST0900 = new Date(PST0900ISO);
const PST0930 = new Date(PST0930ISO);
const PST0900_NEXT_DAY = new Date(PST0900ISO_NEXT_DAY);
const NINETY_MINUTES = 90 * 60 * 1000;

// Mock Date.now to test date sensitive functions
jest.spyOn(Date, 'now').mockReturnValue(PST0900.getTime());

describe('DateUtils', () => {
    describe('isEqual()', () => {
        it('returns true if dates are equal', () => {
            const actual = new Date(PST0900ISO);
            expect(isEqual(actual, PST0900)).toBe(true);
        });

        it('returns false if dates are not equal', () => {
            const actual = new Date(PST0930ISO);
            expect(isEqual(actual, PST0900)).toBe(false);
        });
    });

    describe('compare()', () => {
        it('returns -1 if date1 < date2', () => {
            expect(compare(PST0900, PST0930)).toBe(-1);
        });

        it('returns +1 if date1 > date2', () => {
            expect(compare(PST0930, PST0900)).toBe(1);
        });

        it('returns 0 if date1 === date2', () => {
            const actual = new Date(PST0900ISO);
            expect(compare(actual, PST0900)).toBe(0);
        });
    });

    describe('adjustToStartOfHour()', () => {
        it('adjusts time to start of the hour', () => {
            const actual = adjustToStartOfHour(PST0930, PacificTz);
            expect(isEqual(actual, PST0900)).toBe(true);
        });

        it('returns same time if given start of the hour', () => {
            const actual = adjustToStartOfHour(PST0900, PacificTz);
            expect(isEqual(actual, PST0900)).toBe(true);
        });
    });

    describe('computeDate()', () => {
        it('returns a date from date part, time part and timezone', () => {
            const actual = computeDate('2020-01-01', '09:00 AM', PacificTz);
            expect(isEqual(actual, PST0900)).toBe(true);
        });

        it('throws if computed date is invalid', () => {
            expect(() =>
                computeDate('2020-01-00', '09:00 AM', PacificTz)
            ).toThrow();
        });
    });

    describe('dateToDayDate()', () => {
        it('formats date as Wednesday, January 1, 2020', () => {
            const dateStr = dateToDayDate(PST0900, PacificTz);
            expect(dateStr).toBe('Wednesday, January 1, 2020');
        });
    });

    describe('dateToLongDateTimeStr()', () => {
        it('formats date as Wed, Jan 1st, 2020 9:00 AM', () => {
            const dateStr = dateToLongDateTimeStr(PST0900, PacificTz);
            expect(dateStr).toBe('Wed, Jan 1st, 2020 9:00 AM');
        });
    });

    describe('dateToShortDateTimeStr()', () => {
        it('formats date as Jan 1, 2020 9:00 AM', () => {
            const dateStr = dateToShortDateTimeStr(PST0900, PacificTz);
            expect(dateStr).toBe('Jan 1, 2020 9:00 AM');
        });
    });

    describe('dateToTimeStr()', () => {
        it('formats date as 9:00 AM', () => {
            const dateStr = dateToTimeStr(PST0900, PacificTz);
            expect(dateStr).toBe('9:00 AM');
        });
    });

    describe('dateToFullTimeStr()', () => {
        it('formats date as 09:00 AM', () => {
            const dateStr = dateToFullTimeStr(PST0900, PacificTz);
            expect(dateStr).toBe('09:00 AM');
        });
    });

    describe('dateToISODateString()', () => {
        it('formats date as 2020-01-01', () => {
            const dateStr = dateToISODateString(PST0900, PacificTz);
            expect(dateStr).toBe('2020-01-01');
        });
    });

    describe('dateToISODateTimeString()', () => {
        it('formats date as 2020-01-01T17:00:00.000Z', () => {
            const dateStr = dateToISODateTimeString(PST0900);
            expect(dateStr).toBe('2020-01-01T17:00:00.000Z');
        });
    });

    describe('dateRangeToDateRangeString()', () => {
        it('formats date range as Jan 1, 2020 - Jan 2, 2020', () => {
            const dateStr = dateRangeToDateRangeString(
                PST0900,
                PST0900_NEXT_DAY,
                PacificTz
            );
            expect(dateStr).toBe('Jan 1, 2020 - Jan 2, 2020');
        });
    });

    describe('dateRangeToLongTimeRangeString()', () => {
        it('formats date range as Wed, Jan 1st, 2020 9:00 AM - 9:30 AM', () => {
            const dateStr = dateRangeToLongTimeRangeString(
                PST0900,
                PST0930,
                PacificTz
            );
            expect(dateStr).toBe('Wed, Jan 1st, 2020 9:00 AM - 9:30 AM');
        });
    });

    describe('dateRangeToShortTimeRangeString()', () => {
        it('formats date range as 9:00 AM - 9:30 AM', () => {
            const dateStr = dateRangeToShortTimeRangeString(
                PST0900,
                PST0930,
                PacificTz
            );
            expect(dateStr).toBe('9:00 AM - 9:30 AM');
        });
    });

    describe('gmtOffset()', () => {
        // Caution: this is a date sensitive test.
        // We have fixed the date to standard time.
        it('returns the GMT offset for the specified timezone', () => {
            const offset = gmtOffset(PacificTz);
            expect(offset).toBe('GMT-08:00');
        });
    });

    describe('millisToDurationStr()', () => {
        it('formats millis to duration, e.g. 01:30', () => {
            const durationStr = millisToDurationStr(NINETY_MINUTES);
            expect(durationStr).toBe('01:30');
        });
    });

    describe('millisToISODuration()', () => {
        it('formats millis to duration, e.g. PT1H30M', () => {
            const durationStr = millisToISODuration(NINETY_MINUTES);
            expect(durationStr).toBe('PT1H30M');
        });
    });

    describe('durationStrToMillis()', () => {
        it('returns millis for the given duration string', () => {
            const millis = durationStrToMillis('PT1H30M');
            expect(millis).toEqual(NINETY_MINUTES);
        });
    });

    describe('startOfToday()', () => {
        // Caution: this is a date sensitive test.
        // We have fixed the date to standard time.
        it('returns start of today in the specified timezone', () => {
            const start = startOfToday(PacificTz);
            expect(isEqual(start, PST0000)).toBe(true);
        });
    });

    describe('tzAbbr()', () => {
        // Caution: this is a date sensitive test.
        // We have fixed the date to standard time.
        it('returns timezone abbreviation for the specified timezone', () => {
            const offset = tzAbbr(PacificTz);
            expect(offset).toBe('PST');
        });
    });
});
