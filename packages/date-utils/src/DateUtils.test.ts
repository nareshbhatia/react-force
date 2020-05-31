import { DateUtils } from './DateUtils';

const {
    isEqual,
    compare,
    computeDate,
    durationStrToMillis,
    formatMillisToDuration,
    formatMillisToISODuration,
    formatToDayDate,
    formatToLongDateTime,
    formatToShortDateTime,
    formatToTime,
    formatToFullTime,
    formatToISODate,
    formatToISODateTime,
    formatToDateRange,
    formatToLongTimeRange,
    formatToShortTimeRange,
    gmtOffset,
    startOfToday,
    startOfHour,
    startOfNextHour,
    tzAbbr,
} = DateUtils;

const PST = 'America/Los_Angeles';
const PST0000ISO = '2020-01-01T00:00:00.000-08:00';
const PST0900ISO = '2020-01-01T09:00:00.000-08:00';
const PST0930ISO = '2020-01-01T09:30:00.000-08:00';
const PST1000ISO = '2020-01-01T10:00:00.000-08:00';
const PST0900ISO_NEXT_DAY = '2020-01-02T09:00:00.000-08:00';
const PST0000 = new Date(PST0000ISO);
const PST0900 = new Date(PST0900ISO);
const PST0930 = new Date(PST0930ISO);
const PST1000 = new Date(PST1000ISO);
const PST0900_NEXT_DAY = new Date(PST0900ISO_NEXT_DAY);

// Timezone with offset that is not multiple of an hour
const IST = 'Asia/Calcutta';
const IST0000ISO = '2020-01-01T00:00:00.000+05:30';
const IST0900ISO = '2020-01-01T09:00:00.000+05:30';
const IST0930ISO = '2020-01-01T09:30:00.000+05:30';
const IST1000ISO = '2020-01-01T10:00:00.000+05:30';
const IST0900ISO_NEXT_DAY = '2020-01-02T09:00:00.000-08:00';
const IST0000 = new Date(IST0000ISO);
const IST0900 = new Date(IST0900ISO);
const IST0930 = new Date(IST0930ISO);
const IST1000 = new Date(IST1000ISO);
const IST0900_NEXT_DAY = new Date(IST0900ISO_NEXT_DAY);

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

    describe('computeDate()', () => {
        it('returns a date from date part, time part and timezone', () => {
            const actual = computeDate('2020-01-01', '09:00 AM', PST);
            expect(isEqual(actual, PST0900)).toBe(true);
        });

        it('throws if computed date is invalid', () => {
            expect(() => computeDate('2020-01-00', '09:00 AM', PST)).toThrow();
        });
    });

    describe('durationStrToMillis()', () => {
        it('returns millis for the given duration string', () => {
            const millis = durationStrToMillis('PT1H30M');
            expect(millis).toEqual(NINETY_MINUTES);
        });
    });

    describe('formatMillisToDuration()', () => {
        it('formats millis to duration, e.g. 01:30', () => {
            const durationStr = formatMillisToDuration(NINETY_MINUTES);
            expect(durationStr).toBe('01:30');
        });
    });

    describe('formatMillisToISODuration()', () => {
        it('formats millis to duration, e.g. PT1H30M', () => {
            const durationStr = formatMillisToISODuration(NINETY_MINUTES);
            expect(durationStr).toBe('PT1H30M');
        });
    });

    describe('formatToDayDate()', () => {
        it('formats date as Wednesday, January 1, 2020', () => {
            const dateStr = formatToDayDate(PST0900, PST);
            expect(dateStr).toBe('Wednesday, January 1, 2020');
        });
    });

    describe('formatToLongDateTime()', () => {
        it('formats date as Wed, Jan 1st, 2020 9:00 AM', () => {
            const dateStr = formatToLongDateTime(PST0900, PST);
            expect(dateStr).toBe('Wed, Jan 1st, 2020 9:00 AM');
        });
    });

    describe('formatToShortDateTime()', () => {
        it('formats date as Jan 1, 2020 9:00 AM', () => {
            const dateStr = formatToShortDateTime(PST0900, PST);
            expect(dateStr).toBe('Jan 1, 2020 9:00 AM');
        });
    });

    describe('formatToTime()', () => {
        it('formats date as 9:00 AM', () => {
            const dateStr = formatToTime(PST0900, PST);
            expect(dateStr).toBe('9:00 AM');
        });
    });

    describe('formatToFullTime()', () => {
        it('formats date as 09:00 AM', () => {
            const dateStr = formatToFullTime(PST0900, PST);
            expect(dateStr).toBe('09:00 AM');
        });
    });

    describe('formatToISODate()', () => {
        it('formats date as 2020-01-01', () => {
            const dateStr = formatToISODate(PST0900, PST);
            expect(dateStr).toBe('2020-01-01');
        });
    });

    describe('formatToISODateTime()', () => {
        it('formats date as 2020-01-01T17:00:00.000Z', () => {
            const dateStr = formatToISODateTime(PST0900);
            expect(dateStr).toBe('2020-01-01T17:00:00.000Z');
        });
    });

    describe('formatToDateRange()', () => {
        it('formats date range as Jan 1, 2020 - Jan 2, 2020 (PST)', () => {
            const dateStr = formatToDateRange(PST0900, PST0900_NEXT_DAY, PST);
            expect(dateStr).toBe('Jan 1, 2020 - Jan 2, 2020');
        });

        it('formats date range as Jan 1, 2020 - Jan 2, 2020 (IST)', () => {
            const dateStr = formatToDateRange(IST0900, IST0900_NEXT_DAY, IST);
            expect(dateStr).toBe('Jan 1, 2020 - Jan 2, 2020');
        });
    });

    describe('formatToLongTimeRange()', () => {
        it('formats date range as Wed, Jan 1st, 2020 9:00 AM - 9:30 AM', () => {
            const dateStr = formatToLongTimeRange(PST0900, PST0930, PST);
            expect(dateStr).toBe('Wed, Jan 1st, 2020 9:00 AM - 9:30 AM');
        });
    });

    describe('formatToShortTimeRange()', () => {
        it('formats date range as 9:00 AM - 9:30 AM', () => {
            const dateStr = formatToShortTimeRange(PST0900, PST0930, PST);
            expect(dateStr).toBe('9:00 AM - 9:30 AM');
        });
    });

    describe('gmtOffset()', () => {
        // Caution: this is a date sensitive test.
        // We have fixed the date to standard time.
        it('returns the GMT offset for the specified timezone', () => {
            const offset = gmtOffset(PST);
            expect(offset).toBe('GMT-08:00');
        });
    });

    describe('startOfToday()', () => {
        // Caution: this is a date sensitive test.
        // We have fixed the date to standard time.
        it('returns start of today in the specified timezone (PST)', () => {
            const start = startOfToday(PST);
            expect(isEqual(start, PST0000)).toBe(true);
        });

        it('returns start of today in the specified timezone (IST)', () => {
            const start = startOfToday(IST);
            expect(isEqual(start, IST0000)).toBe(true);
        });
    });

    describe('startOfHour()', () => {
        it('returns start of the hour (PST)', () => {
            const actual = startOfHour(PST0930, PST);
            expect(isEqual(actual, PST0900)).toBe(true);
        });

        it('returns start of the hour (IST)', () => {
            const actual = startOfHour(IST0930, IST);
            expect(isEqual(actual, IST0900)).toBe(true);
        });

        it('returns same time if given start of the hour (PST)', () => {
            const actual = startOfHour(PST0900, PST);
            expect(isEqual(actual, PST0900)).toBe(true);
        });

        it('returns same time if given start of the hour (IST)', () => {
            const actual = startOfHour(IST0900, IST);
            expect(isEqual(actual, IST0900)).toBe(true);
        });
    });

    describe('startOfNextHour()', () => {
        it('returns start of the next hour (PST)', () => {
            const actual = startOfNextHour(PST0930, PST);
            expect(isEqual(actual, PST1000)).toBe(true);
        });

        it('returns start of the next hour (IST)', () => {
            const actual = startOfNextHour(IST0930, IST);
            expect(isEqual(actual, IST1000)).toBe(true);
        });

        it('returns same time if given start of the hour (PST)', () => {
            const actual = startOfNextHour(PST0900, PST);
            expect(isEqual(actual, PST0900)).toBe(true);
        });

        it('returns same time if given start of the hour (IST)', () => {
            const actual = startOfNextHour(IST0900, IST);
            expect(isEqual(actual, IST0900)).toBe(true);
        });
    });

    describe('tzAbbr()', () => {
        // Caution: this is a date sensitive test.
        // We have fixed the date to standard time.
        it('returns timezone abbreviation for the specified timezone', () => {
            const offset = tzAbbr(PST);
            expect(offset).toBe('PST');
        });
    });
});
