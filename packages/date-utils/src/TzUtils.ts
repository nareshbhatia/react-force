import moment from 'moment';
import 'moment-timezone';
import { DateUtils } from './DateUtils';

const { gmtOffset, tzAbbr } = DateUtils;

/**
 * Timezone
 *
 * Example:
 *   {
 *     name: 'America/New_York',
 *     label: '(GMT-04:00) America/New_York - EDT'
 *   }
 */
export interface Timezone {
    name: string;
    label: string;
}

/**
 * Returns a descriptive label for the specified timezone name
 * @param tzName
 */
function getTimezoneLabel(tzName: string) {
    return `(${gmtOffset(tzName)}) ${tzName} - ${tzAbbr(tzName)}`;
}

/**
 * Returns an array of Timezones
 */
function getTimezones(): Array<Timezone> {
    return moment.tz
        .names()
        .map((name) => {
            const now = Date.now();
            const zone = moment.tz.zone(name);
            return { name, offset: zone !== null ? zone.utcOffset(now) : 0 };
        })
        .sort((a, b) =>
            a.offset === b.offset
                ? a.name.localeCompare(b.name)
                : b.offset - a.offset
        )
        .map((zone) => {
            const name = zone.name;
            return {
                name,
                label: getTimezoneLabel(name),
            };
        });
}

/**
 * Finds a timezone by name
 * @param timezones
 * @param tzName
 */
function findTimezone(
    timezones: Array<Timezone>,
    tzName: string
): Timezone | undefined {
    return timezones.find((timezone) => timezone.name === tzName);
}

export const TzUtils = {
    getTimezoneLabel,
    getTimezones,
    findTimezone,
};
