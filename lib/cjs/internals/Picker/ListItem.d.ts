import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../types';
export interface ListItemProps extends WithAsProps, Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
    active?: boolean;
    disabled?: boolean;
    value?: string | number;
    focus?: boolean;
    title?: string;
    onSelect?: (value: any, event: React.MouseEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    renderItem?: (value: any) => React.ReactNode;
}
declare const ListItem: RsRefForwardingComponent<'div', ListItemProps>;
export default ListItem;
