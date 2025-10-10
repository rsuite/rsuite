export interface ClockTime {
    hours?: number | null;
    minutes?: number | null;
    seconds?: number | null;
    meridiem?: 'AM' | 'PM' | null;
}
export declare function getClockTime(props: {
    date?: Date;
    format?: string;
    showMeridiem: boolean;
}): ClockTime;
