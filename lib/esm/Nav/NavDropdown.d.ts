import React from 'react';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../internals/types';
import Button from '../Button';
import NavDropdownItem from './NavDropdownItem';
import NavDropdownMenu from './NavDropdownMenu';
import { NavDropdownToggleProps } from './NavDropdownToggle';
export type NavDropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface NavDropdownProps<T = any> extends WithAsProps, Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
    /** Define the title as a submenu */
    title?: React.ReactNode;
    /** Set the icon */
    icon?: NavDropdownToggleProps['icon'];
    /** Triggering events */
    trigger?: NavDropdownTrigger | readonly NavDropdownTrigger[];
    /** The placement of Menu */
    placement?: TypeAttributes.Placement8;
    /** Whether or not component is disabled */
    disabled?: boolean;
    /** The style of the menu */
    menuStyle?: React.CSSProperties;
    /** A css class to apply to the Toggle DOM node */
    toggleClassName?: string;
    /** The value of the current option */
    eventKey?: T;
    /** You can use a custom element type for this toggle component */
    toggleAs?: React.ElementType;
    /** No caret variation */
    noCaret?: NavDropdownToggleProps['noCaret'];
    /**
     * Open the menu and control it
     * @deprecated
     */
    open?: boolean;
    /**
     * @deprecated
     */
    renderTitle?: (children: React.ReactNode) => React.ReactNode;
    /** Custom Toggle */
    renderToggle?: (props: WithAsProps, ref: React.Ref<any>) => any;
    /** The callback function that the menu closes */
    onClose?: () => void;
    /** Menu Pop-up callback function */
    onOpen?: () => void;
    /** Callback function for menu state switching */
    onToggle?: (open: boolean, eventKey?: T | undefined, event?: React.SyntheticEvent) => void;
}
export interface NavDropdownComponent extends RsRefForwardingComponent<'div', NavDropdownProps> {
    <ToggleAs extends React.ElementType = typeof Button>(props: NavDropdownProps & {
        ref?: React.Ref<any>;
        toggleAs?: ToggleAs;
    } & React.ComponentProps<ToggleAs>, context: any): JSX.Element | null;
    /**
     * @deprecated Use <Nav.Item> instead.
     */
    Item: typeof NavDropdownItem;
    /**
     * @deprecated Use <Nav.Menu> instead.
     */
    Menu: typeof NavDropdownMenu;
}
/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a `<Nav.Menu>` call
 *
 * @example
 * <Nav>
 *   <Nav.Menu> -> This will render <NavDropdown> component
 *   </Nav.Menu>
 * </Nav>
 */
declare const NavDropdown: NavDropdownComponent;
export default NavDropdown;
