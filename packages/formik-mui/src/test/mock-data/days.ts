export interface Day {
    id: string;
    name: string;
    dayOfWeek: number;
}

export const days: Array<Day> = [
    {
        id: 'Mon',
        name: 'Monday',
        dayOfWeek: 1,
    },
    {
        id: 'Tue',
        name: 'Tuesday',
        dayOfWeek: 2,
    },
    {
        id: 'Wed',
        name: 'Wednesday',
        dayOfWeek: 3,
    },
    {
        id: 'Thu',
        name: 'Thursday',
        dayOfWeek: 4,
    },
    {
        id: 'Fri',
        name: 'Friday',
        dayOfWeek: 5,
    },
];
