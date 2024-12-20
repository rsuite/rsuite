import React, { useCallback, useContext } from 'react';
import omit from 'lodash/omit';
import Menu from '@/internals/Menu/Menu';
import MenuItem from '@/internals/Menu/MenuItem';
import ArrowLeftLine from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLine from '@rsuite/icons/ArrowRightLine';
import NavContext from '../Nav/NavContext';
import ExpandedSidenavDropdownMenu from './ExpandedSidenavDropdownMenu';
import { useClassNames } from '@/internals/hooks';
import { mergeRefs } from '@/internals/utils';
import { SidenavContext } from './Sidenav';
import { useCustom } from '../CustomProvider';
import type { IconProps } from '@rsuite/icons/Icon';
import type { StandardProps } from '@/internals/types';

export interface SidenavDropdownMenuProps<T = any> extends StandardProps {
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
  onToggle?: (open: boolean, eventKey?: T | undefined, event?: React.SyntheticEvent) => void;
}

/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Menu> within a <Sidenav>
 *
 * <Sidenav>
 *   <Nav>
 *     <Nav.Menu>
 *       <Nav.Menu></Nav.Menu> -> This submenu will render <SidenavDropdownMenu> component
 *     </Nav.Menu>
 *   </Nav>
 * </Sidenav>
 */
const SidenavDropdownMenu = React.forwardRef<
  HTMLElement,
  SidenavDropdownMenuProps &
    Omit<React.HTMLAttributes<HTMLUListElement>, 'title' | 'onToggle' | 'onSelect'>
>((props, ref) => {
  const sidenav = useContext(SidenavContext);
  const nav = useContext(NavContext);

  if (!sidenav || !nav) {
    throw new Error(
      '<Sidenav.Dropdown.Menu> must be rendered within a <Nav> within a <Sidenav> component.'
    );
  }

  const { onToggle, eventKey, title, classPrefix = 'dropdown-menu', children, ...rest } = props;
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

  if (sidenav.expanded) {
    return <ExpandedSidenavDropdownMenu ref={ref} {...(omit(props, 'classPrefix') as any)} />;
  }

  // Parent menu exists. This is a submenu.
  // Should render a `menuitem` that controls this submenu.
  const { icon, className, disabled, ...menuProps } = omit(rest, ['trigger']);

  const Icon = rtl ? ArrowLeftLine : ArrowRightLine;

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
                <Icon className={prefix`toggle-icon`} />
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

SidenavDropdownMenu.displayName = 'Sidenav.Dropdown.Menu';

export default SidenavDropdownMenu;
