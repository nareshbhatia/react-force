export type DayEnum = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface Day {
    id: DayEnum;
    name: string;
    dayOfWeek: number;
}

export const days: Array<Day> = [
    {
        id: 'mon',
        name: 'Monday',
        dayOfWeek: 1,
    },
    {
        id: 'tue',
        name: 'Tuesday',
        dayOfWeek: 2,
    },
    {
        id: 'wed',
        name: 'Wednesday',
        dayOfWeek: 3,
    },
    {
        id: 'thu',
        name: 'Thursday',
        dayOfWeek: 4,
    },
    {
        id: 'fri',
        name: 'Friday',
        dayOfWeek: 5,
    },
    {
        id: 'sat',
        name: 'Saturday',
        dayOfWeek: 6,
    },
    {
        id: 'sun',
        name: 'Sunday',
        dayOfWeek: 7,
    },
];
