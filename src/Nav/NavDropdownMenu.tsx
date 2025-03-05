import React, { useCallback, useContext } from 'react';
import omit from 'lodash/omit';
import Menu from '@/internals/Menu/Menu';
import MenuItem from '@/internals/Menu/MenuItem';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageNextIcon from '@rsuite/icons/PageNext';
import NavContext from './NavContext';
import { useClassNames } from '@/internals/hooks';
import { mergeRefs } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import type { StandardProps, SanitizedHTMListProps } from '@/internals/types';
import type { IconProps } from '@rsuite/icons/Icon';
import type { DeprecatedDropdownMenuProps } from '../Dropdown/types';

export interface NavDropdownMenuProps<T = any> extends StandardProps, DeprecatedDropdownMenuProps {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /**
   * Direction that the sub-menu open towards
   * - start: towards the head of the reading direction (right by default, left in RTL)
   * - end: towards the end of the reading direction (left by default, right in RTL)
   *
   * @default 'end'
   */
  openDirection?: 'start' | 'end';

  /** No caret variation */
  noCaret?: boolean;

  /**
   * Only used for setting the default expand state when it's a submenu.
   */
  eventKey?: T;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Whether the dropdown menu is open */
  open?: boolean;

  /** Whether the dropdown menu is collapsible */
  collapsible?: boolean;

  /** Whether the dropdown menu is expanded */
  expanded?: boolean;

  /** Whether the dropdown menu is active */
  active?: boolean;

  /** Whether the dropdown menu is disabled */
  disabled?: boolean;

  /**
   * Callback function that is triggered when the dropdown menu is toggled
   * @param open - Whether the dropdown menu is open
   * @param eventKey - The eventKey of the dropdown menu
   * @param event - The event object
   */
  onToggle?: (open: boolean, eventKey?: T | undefined, event?: React.SyntheticEvent) => void;
}

/**
 * @private
 */
const NavDropdownMenu = React.forwardRef<HTMLElement, NavDropdownMenuProps & SanitizedHTMListProps>(
  (props, ref) => {
    const nav = useContext(NavContext);

    if (!nav) {
      throw new Error('<Nav.Dropdown.Menu> should be used within a <Nav> component.');
    }

    const {
      onToggle,
      eventKey,
      title,
      classPrefix = 'dropdown-menu',
      children,
      openDirection = 'end',
      noCaret,
      ...rest
    } = props;

    const { rtl } = useCustom();
    const handleToggleSubmenu = useCallback(
      (open: boolean, event: React.SyntheticEvent) => {
        onToggle?.(open, eventKey, event);
      },
      [eventKey, onToggle]
    );
    const { prefix } = useClassNames(classPrefix);

    const { withClassPrefix: withMenuClassPrefix, merge: mergeMenuClassName } =
      useClassNames('dropdown-menu');

    const {
      merge: mergeItemClassNames,
      withClassPrefix: withItemClassPrefix,
      prefix: prefixItemClassName
    } = useClassNames('dropdown-item');

    // Parent menu exists. This is a submenu.
    // Should render a `menuitem` that controls this submenu.
    const { icon, className, disabled, ...menuProps } = omit(rest, ['trigger']);

    const Icon = rtl ? PagePreviousIcon : PageNextIcon;

    return (
      <Menu
        openMenuOn={['mouseover', 'click']}
        renderMenuButton={({ open, ...menuButtonProps }, buttonRef) => (
          <MenuItem disabled={disabled}>
            {({ selected, active, ...menuitem }, menuitemRef) => {
              const classes = mergeItemClassNames(
                className,
                prefixItemClassName`toggle`,
                withItemClassPrefix({
                  'with-icon': icon,
                  open,
                  active: selected,
                  disabled,
                  focus: active
                })
              );

              return (
                <div
                  ref={mergeRefs(buttonRef, menuitemRef as any)}
                  className={classes}
                  data-event-key={eventKey}
                  data-event-key-type={typeof eventKey}
                  {...(menuitem as any)}
                  {...omit(menuButtonProps, ['role'])}
                >
                  {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
                  {title}
                  {!noCaret && <Icon className={prefix`toggle-icon`} />}
                </div>
              );
            }}
          </MenuItem>
        )}
        renderMenuPopup={({ open, ...popupProps }, popupRef) => {
          const menuClassName = mergeMenuClassName(className, withMenuClassPrefix());

          return (
            <ul
              ref={popupRef}
              className={menuClassName}
              hidden={!open}
              data-direction={openDirection}
              {...popupProps}
              {...menuProps}
            >
              {children}
            </ul>
          );
        }}
        onToggleMenu={handleToggleSubmenu}
      >
        {({ open, ...menuContainer }, menuContainerRef) => {
          const classes = mergeItemClassNames(
            className,
            withItemClassPrefix({
              disabled,
              open,
              submenu: true
            })
          );
          return (
            <li
              ref={mergeRefs(ref, menuContainerRef as any)}
              className={classes}
              {...(menuContainer as any)}
            />
          );
        }}
      </Menu>
    );
  }
);

NavDropdownMenu.displayName = 'Nav.Dropdown.Menu';

export default NavDropdownMenu;
