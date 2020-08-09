import { TzUtils } from '../src';

const { getTimezoneLabel, getTimezones, findTimezone } = TzUtils;

const PST0900ISO = '2020-01-01T09:00:00.000-08:00';
const PST0900 = new Date(PST0900ISO);
const TestTz = 'America/Los_Angeles';
const TestTzLabel = '(GMT-08:00) America/Los_Angeles - PST';

// Mock Date.now to test date sensitive functions
jest.spyOn(Date, 'now').mockReturnValue(PST0900.getTime());

describe('TzUtils', () => {
    describe('getTimezoneLabel()', () => {
        it('returns a descriptive label for a timezone name', () => {
            expect(getTimezoneLabel(TestTz)).toBe(TestTzLabel);
        });
    });

    describe('getTimezones()', () => {
        it('returns all timezones', () => {
            const timezones = getTimezones();
            expect(findTimezone(timezones, TestTz)).toEqual({
                name: TestTz,
                label: TestTzLabel,
            });
        });
    });
});
