import { RsRefForwardingComponent, WithAsProps } from '../../internals/types';
export interface MonthDropdownProps extends WithAsProps {
    show?: boolean;
    limitStartYear?: number;
    limitEndYear?: number;
    height?: number;
    width?: number;
    disabledMonth?: (date: Date) => boolean;
}
declare const MonthDropdown: RsRefForwardingComponent<'div', MonthDropdownProps>;
export default MonthDropdown;
