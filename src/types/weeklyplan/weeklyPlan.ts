export interface MealCardProps {
    title: string;
    subtitle: string;
    badges: string[];
    type: 'Lunch' | 'Dinner';
}

export interface CalendarDate {
    date: number | null;
    inRange?: boolean;
    isStart?: boolean;
    isEnd?: boolean;
    isSelected?: boolean;
    disabled?: boolean;
}
