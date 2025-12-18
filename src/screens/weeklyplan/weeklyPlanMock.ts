import { CalendarDate } from "../../types/weeklyplan/weeklyPlan";

export const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const CALENDAR_WEEKS: CalendarDate[][] = [
    [
        { date: null },
        { date: 1, inRange: true, isStart: true },
        { date: 2, inRange: true, isSelected: true },
        { date: 3, inRange: true },
        { date: 4, inRange: true },
        { date: 5, inRange: true },
        { date: 6, inRange: true, isEnd: true },
    ],
    [
        { date: 7 }, { date: 8 }, { date: 9 }, { date: 10 }, { date: 11 }, { date: 12 }, { date: 13 }
    ],
    [
        { date: 14, disabled: true }, { date: 15, disabled: true }, { date: 16, disabled: true },
        { date: 17, disabled: true }, { date: 18, disabled: true }, { date: 19, disabled: true }, { date: 20, disabled: true }
    ]
];
