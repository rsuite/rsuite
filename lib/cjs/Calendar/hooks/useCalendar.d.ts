/// <reference types="react" />
/// <reference types="date-fns" />
export declare const useCalendar: () => {
    formatDate?: typeof import("date-fns").format | undefined;
    date?: Date | undefined;
    dateRange?: Date[] | undefined;
    format?: string | undefined;
    hoverRangeValue?: [Date, Date] | undefined;
    inline?: boolean | undefined;
    targetId?: string | undefined;
    monthDropdownProps?: import("../types").MonthDropdownProps | undefined;
    disabledDate?: ((date: Date, selectRangeValue?: Date[] | undefined, type?: string | undefined) => boolean) | undefined;
    inSameMonth?: ((date: Date) => boolean) | undefined;
    onChangeMonth?: ((nextPageDate: Date, event: import("react").MouseEvent<Element, MouseEvent>) => void) | undefined;
    onChangeTime?: ((nextPageTime: Date, event: import("react").MouseEvent<Element, MouseEvent>) => void) | undefined;
    onMouseMove?: ((date: Date) => void) | undefined;
    onSelect?: ((date: Date, event: import("react").MouseEvent<Element, MouseEvent>) => void) | undefined;
    renderCell?: ((date: Date) => import("react").ReactNode) | undefined;
    renderCellOnPicker?: ((date: Date) => import("react").ReactNode) | undefined;
    cellClassName?: ((date: Date) => string | undefined) | undefined;
    locale: import("../..").CalendarLocale | undefined;
    showWeekNumbers: boolean | undefined;
    isoWeek: boolean;
    weekStart: 0 | 2 | 1 | 3 | 4 | 5 | 6;
};
