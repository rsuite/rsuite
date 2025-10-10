import type { RsRefForwardingComponent, WithAsProps } from '../../internals/types';
export interface MonthDropdownItemProps extends WithAsProps {
    month?: number;
    year?: number;
    active?: boolean;
    disabled?: boolean;
}
declare const MonthDropdownItem: RsRefForwardingComponent<'div', MonthDropdownItemProps>;
export default MonthDropdownItem;
