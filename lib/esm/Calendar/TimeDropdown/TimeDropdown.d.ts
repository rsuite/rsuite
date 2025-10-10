import { RsRefForwardingComponent, WithAsProps } from '../../internals/types';
export interface TimeDropdownProps extends WithAsProps {
    show?: boolean;
    showMeridiem?: boolean;
    disabledDate?: (date: Date) => boolean;
    disabledHours?: (hour: number, date: Date) => boolean;
    disabledMinutes?: (minute: number, date: Date) => boolean;
    disabledSeconds?: (second: number, date: Date) => boolean;
    hideHours?: (hour: number, date: Date) => boolean;
    hideMinutes?: (minute: number, date: Date) => boolean;
    hideSeconds?: (second: number, date: Date) => boolean;
}
declare const TimeDropdown: RsRefForwardingComponent<'div', TimeDropdownProps>;
export default TimeDropdown;
