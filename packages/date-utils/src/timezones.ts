import { Timezone, TzUtils } from './TzUtils';

export const timezones = TzUtils.getTimezones();

export const DefaultTz = 'America/New_York';
export const DefaultTimezone: Timezone = TzUtils.findTimezone(
    timezones,
    DefaultTz
) as Timezone;
