export declare enum CalendarState {
    'TIME' = "TIME",
    'MONTH' = "MONTH"
}
export interface CalendarStateProps {
    defaultState?: CalendarState;
    calendarDate: Date;
    onMoveForward?: (date: Date) => void;
    onMoveBackward?: (date: Date) => void;
    onToggleTimeDropdown?: (toggle: boolean) => void;
    onToggleMonthDropdown?: (toggle: boolean) => void;
}
export declare const useCalendarState: (props: CalendarStateProps) => {
    calendarState: CalendarState | undefined;
    handlers: {
        onMoveForward: (...args: any[]) => any;
        onMoveBackward: (...args: any[]) => any;
        onToggleTimeDropdown: (...args: any[]) => any;
        onToggleMonthDropdown: (...args: any[]) => any;
    };
    reset: (...args: any[]) => any;
};
