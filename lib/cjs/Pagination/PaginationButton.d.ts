import React from 'react';
import { WithAsProps, RsRefForwardingComponent } from '../internals/types';
export interface PaginationButtonProps<T = number | string> extends WithAsProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onSelect'> {
    /** The value of the current option */
    eventKey: T;
    /** Called when the button is clicked. */
    onClick?: React.MouseEventHandler;
    /** A button can show it is currently unable to be interacted with */
    disabled?: boolean;
    /** A button can show it is currently the active user selection */
    active?: boolean;
    /** Primary content */
    children?: React.ReactNode;
    /** Select the callback function for the current option  */
    onSelect?: (eventKey: T, event: React.MouseEvent) => void;
}
declare const PaginationButton: RsRefForwardingComponent<'button', PaginationButtonProps>;
export default PaginationButton;
