import React from 'react';
import type { StandardProps } from '../internals/types';
import type { IconProps } from '@rsuite/icons/Icon';
export interface DropdownMenuProps<T = string> extends StandardProps {
    /** Define the title as a submenu */
    title?: React.ReactNode;
    /** The submenu expands from the left and defaults to the right */
    pullLeft?: boolean;
    /**
     *  Only used for setting the default expand state when it's a submenu.
     */
    eventKey?: T;
    /** Set the icon */
    icon?: React.ReactElement<IconProps>;
    open?: boolean;
    collapsible?: boolean;
    expanded?: boolean;
    active?: boolean;
    disabled?: boolean;
    activeKey?: T;
    trigger?: 'hover' | 'click';
    onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
    onToggle?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}
/**
 * The `<Dropdown.Menu>` API
 *
 * @description
 * Note the difference between this component and `<Menu>` component:
 * `<Menu>` is used for ARIA menu control logic and is used internally only.
 * This component is only used for supporting submenu syntax and is
 * assigned to Dropdown.Menu
 *
 * @example
 *
 * <Dropdown>
 *   <Dropdown.Item>Item 1</Dropdown.Item>
 *   <Dropdown.Menu title="Submenu">
 *     <Dropdown.Item>Sub item</Dropdown.Item>
 *   </Dropdown.Menu>
 * </Dropdown>
 */
declare const DropdownMenu: React.ForwardRefExoticComponent<DropdownMenuProps<string> & Omit<React.HTMLAttributes<HTMLUListElement>, "title" | "onSelect"> & React.RefAttributes<HTMLElement>>;
export default DropdownMenu;
