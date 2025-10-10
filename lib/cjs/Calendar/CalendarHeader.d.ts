import React from 'react';
import { RsRefForwardingComponent, WithAsProps } from '../internals/types';
export interface CalendarHeaderProps {
    disabledBackward?: boolean;
    disabledForward?: boolean;
    renderTitle?: (date: Date) => React.ReactNode;
    renderToolbar?: (date: Date) => React.ReactNode;
}
interface CalendarHeaderPrivateProps extends CalendarHeaderProps, WithAsProps {
    showDate?: boolean;
    showMonth?: boolean;
    showTime?: boolean;
    disabledTime?: (date: Date) => boolean;
    onMoveBackward?: () => void;
    onMoveForward?: () => void;
    onToggleMonthDropdown?: (event: React.MouseEvent) => void;
    onToggleTimeDropdown?: (event: React.MouseEvent) => void;
}
declare const CalendarHeader: RsRefForwardingComponent<'div', CalendarHeaderPrivateProps>;
export default CalendarHeader;
