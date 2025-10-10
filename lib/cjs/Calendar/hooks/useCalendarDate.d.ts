export declare const useCalendarDate: (value: Date | null | undefined, defaultDate: Date | undefined) => {
    calendarDate: Date;
    setCalendarDate: (date: React.SetStateAction<Date> | undefined) => void;
    resetCalendarDate: (nextValue?: any) => void;
};
