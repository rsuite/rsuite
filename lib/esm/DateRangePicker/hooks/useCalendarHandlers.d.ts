/// <reference types="react" />
interface CalendarHandlerProps {
    index: number;
    calendarDateRange: Date[];
    onChangeCalendarMonth?: (index: number, nextPageDate: Date) => void;
    onChangeCalendarTime?: (index: number, nextPageDate: Date) => void;
    onSelect?: (index: number, date: Date, event: React.SyntheticEvent) => void;
}
export declare function useCalendarHandlers({ index, calendarDateRange, onChangeCalendarMonth, onChangeCalendarTime, onSelect }: CalendarHandlerProps): {
    calendarDate: Date;
    onSelect: (...args: any[]) => any;
    onChangeMonth: (...args: any[]) => any;
    onChangeTime: (...args: any[]) => any;
    onMoveForward: (...args: any[]) => any;
    onMoveBackward: (...args: any[]) => any;
};
export default useCalendarHandlers;
