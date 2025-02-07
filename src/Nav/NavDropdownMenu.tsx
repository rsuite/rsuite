import React, { useCallback, useContext } from 'react';
import omit from 'lodash/omit';
import Menu from '@/internals/Menu/Menu';
import MenuItem from '@/internals/Menu/MenuItem';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageNextIcon from '@rsuite/icons/PageNext';
import NavContext from './NavContext';
import { useClassNames } from '@/internals/hooks';
import { mergeRefs } from '@/internals/utils';
import { StandardProps } from '@/internals/types';
import { IconProps } from '@rsuite/icons/Icon';
import { useCustom } from '../CustomProvider';

export interface NavDropdownMenuProps<T = any> extends StandardProps {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /**
   * The submenu expands from the left and defaults to the right
   * @deprecated Use openDirection="start" instead
   */
  pullLeft?: boolean;

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
  onToggle?: (open: boolean, eventKey?: T | undefined, event?: React.SyntheticEvent) => void;
}

/**
 * @private
 */
const NavDropdownMenu = React.forwardRef<
  HTMLElement,
  NavDropdownMenuProps &
    Omit<React.HTMLAttributes<HTMLUListElement>, 'title' | 'onToggle' | 'onSelect'>
>((props, ref) => {
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
});

NavDropdownMenu.displayName = 'Nav.Dropdown.Menu';

export default NavDropdownMenu;
