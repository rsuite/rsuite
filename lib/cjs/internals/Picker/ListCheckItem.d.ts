import React from 'react';
import { CheckboxProps } from '../../Checkbox';
import { WithAsProps, RsRefForwardingComponent } from '../types';
export interface ListCheckItemProps extends WithAsProps, Omit<CheckboxProps, 'onSelect'> {
    active?: boolean;
    checkboxAs?: React.ElementType | string;
    focus?: boolean;
    onSelect?: (value: any, event: React.SyntheticEvent, checked: boolean) => void;
    onCheck?: (value: any, event: React.SyntheticEvent, checked: boolean) => void;
    onSelectItem?: (value: any, event: React.SyntheticEvent, checked: boolean) => void;
    renderCheckbox?: (checkboxProps: CheckboxProps) => React.ReactNode;
}
declare const ListCheckItem: RsRefForwardingComponent<'div', ListCheckItemProps>;
export default ListCheckItem;
