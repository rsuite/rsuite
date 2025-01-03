import React, { useCallback, useContext, useMemo } from 'react';
import omit from 'lodash/omit';
import Menu from '@/internals/Menu/Menu';
import MenuItem from '@/internals/Menu/MenuItem';
import Menubar from '@/internals/Menu/Menubar';
import PagePreviousIcon from '@rsuite/icons/PagePrevious';
import PageNextIcon from '@rsuite/icons/PageNext';
import DropdownContext from './DropdownContext';
import Nav from '../Nav';
import NavContext from '../Nav/NavContext';
import { useClassNames } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import { mergeRefs, warnOnce } from '@/internals/utils';
import type { StandardProps } from '@/internals/types';
import type { IconProps } from '@rsuite/icons/Icon';

export interface DropdownMenuProps<T = string | number> extends StandardProps {
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
const DropdownMenu = React.forwardRef<
  HTMLElement,
  DropdownMenuProps & Omit<React.HTMLAttributes<HTMLUListElement>, 'title' | 'onSelect'>
>((props, ref) => {
  const {
    onToggle,
    eventKey,
    title,
    activeKey,
    onSelect,
    classPrefix = 'dropdown-menu',
    className,
    children,
    ...rest
  } = props;

  const nav = useContext(NavContext);

  const dropdown = useContext(DropdownContext);
  const { rtl } = useCustom();

  const handleToggleSubmenu = useCallback(
    (_: boolean, event: React.SyntheticEvent) => {
      onToggle?.(eventKey, event);
    },
    [eventKey, onToggle]
  );
  const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);

  const { withClassPrefix: withMenuClassPrefix, merge: mergeMenuClassName } =
    useClassNames('dropdown-menu');

  const {
    merge: mergeItemClassNames,
    withClassPrefix: withItemClassPrefix,
    prefix: prefixItemClassName
  } = useClassNames('dropdown-item');

  const contextValue = useMemo(() => ({ activeKey, onSelect }), [activeKey, onSelect]);

  // If rendered within a <Nav>
  // Suggest <Nav.Menu>
  if (nav) {
    warnOnce('Usage of <Dropdown.Menu> within <Nav> is deprecated. Replace with <Nav.Menu>');

    return <Nav.Menu ref={ref} {...(props as any)} />;
  }

  // <Dropdown.Menu> is used outside of <Dropdown>
  // renders a vertical `menubar`
  if (!dropdown) {
    const classes = merge(className, withClassPrefix());

    return (
      <DropdownContext.Provider value={contextValue}>
        <Menubar vertical>
          {(menubar, menubarRef: React.Ref<HTMLElement>) => (
            <ul ref={mergeRefs(menubarRef, ref)} className={classes} {...menubar} {...rest}>
              {children}
            </ul>
          )}
        </Menubar>
      </DropdownContext.Provider>
    );
  }

  // Parent menu exists. This is a submenu.
  // Should render a `menuitem` that controls this submenu.
  const { icon, disabled, ...menuProps } = omit(rest, ['trigger']);

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

DropdownMenu.displayName = 'Dropdown.Menu';

export default DropdownMenu;
