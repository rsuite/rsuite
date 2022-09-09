import React, { useCallback, useContext, useMemo } from 'react';
import omit from 'lodash/omit';
import Menu from '../Menu/Menu';
import MenuItem from '../Menu/MenuItem';
import { mergeRefs, useClassNames } from '../utils';
import PropTypes from 'prop-types';
import { StandardProps } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import useCustom from '../utils/useCustom';
import DropdownContext from './DropdownContext';
import Menubar from '../Menu/Menubar';
import Nav from '../Nav';
import NavContext from '../Nav/NavContext';
import warnOnce from '../utils/warnOnce';

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
 * The <Dropdown.Menu> API
 *
 * @description
 * Note the difference between this component and <Menu> component:
 * <Menu> is used for ARIA menu control logic and is used internally only.
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
  const { rtl } = useCustom('DropdownMenu');

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

  const Icon = rtl ? AngleLeft : AngleRight;

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
DropdownMenu.propTypes = {
  active: PropTypes.bool,
  activeKey: PropTypes.any,
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.any,
  classPrefix: PropTypes.string,
  pullLeft: PropTypes.bool,
  title: PropTypes.node,
  open: PropTypes.bool,
  trigger: PropTypes.oneOf(['click', 'hover']),
  eventKey: PropTypes.any,
  expanded: PropTypes.bool,
  collapsible: PropTypes.bool,
  onSelect: PropTypes.func,
  onToggle: PropTypes.func
};

export default DropdownMenu;
