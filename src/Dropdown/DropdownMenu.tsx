import React, { useCallback, useContext } from 'react';
import omit from 'lodash/omit';
import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItem';
import { mergeRefs, useClassNames } from '../utils';
import PropTypes from 'prop-types';
import { StandardProps } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import { SidenavContext } from '../Sidenav/Sidenav';
import TreeviewItem from '../Sidenav/TreeviewItem';
import AngleLeft from '@rsuite/icons/legacy/AngleLeft';
import AngleRight from '@rsuite/icons/legacy/AngleRight';
import useCustom from '../utils/useCustom';
import DropdownContext from './DropdownContext';
import Menubar from '../Navbar/Menubar';

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
  onSelect?: (eventKey: T, event: React.SyntheticEvent<Element>) => void;
  onToggle?: (eventKey: T, event: React.SyntheticEvent<Element>) => void;
}

const defaultProps: Partial<MenuProps> = {
  classPrefix: 'dropdown-menu'
};

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
const DropdownMenu = React.forwardRef(
  (
    props: DropdownMenuProps & Omit<React.HTMLAttributes<HTMLUListElement>, 'title' | 'onSelect'>,
    ref
  ) => {
    const { onToggle, eventKey, title, onSelect, classPrefix, ...rest } = props;

    const dropdown = useContext(DropdownContext);
    const sidenav = useContext(SidenavContext);
    const { rtl } = useCustom('DropdownMenuItem');

    const handleToggleSubmenu = useCallback(
      (_: boolean, event: React.SyntheticEvent<HTMLElement>) => {
        onToggle?.(eventKey, event);
      },
      [eventKey, onToggle]
    );
    const { merge, prefix, withClassPrefix } = useClassNames(classPrefix);

    const {
      merge: mergeItemClassNames,
      withClassPrefix: withItemClassPrefix,
      prefix: prefixItemClassName
    } = useClassNames('dropdown-item');

    // <Dropdown.Menu> is used outside of <Dropdown>
    // renders a vertical `menubar`
    if (!dropdown) {
      const classes = merge(props.className, withClassPrefix());

      return (
        <Menubar
          vertical
          onActivateItem={event => {
            const { eventKey, eventKeyType } = (event.target as HTMLElement).dataset;

            // Only cast number type for now
            const eventKeyToEmit = eventKeyType === 'number' ? Number(eventKey) : eventKey;
            onSelect?.(eventKeyToEmit as any, event);
          }}
        >
          {(menubar, menubarRef) => (
            <ul ref={mergeRefs(menubarRef, ref)} className={classes} {...menubar} {...rest} />
          )}
        </Menubar>
      );
    }

    if (sidenav?.expanded) {
      return <TreeviewItem {...(omit(props, 'classPrefix') as any)} />;
    }

    const sidenavExpanded = sidenav?.expanded ?? false;

    // Parent menu exists. This is a submenu.
    // Should render a `menuitem` that controls this submenu.
    const { icon, className, disabled, ...menuProps } = omit(rest, ['trigger']);

    const Icon = rtl ? AngleLeft : AngleRight;

    return (
      <Menu
        ref={ref}
        as="li"
        classPrefix="dropdown-item"
        openMenuOn={['mouseover', 'click']}
        renderMenuButton={({ open, ...menuButtonProps }) => (
          <MenuItem disabled={disabled}>
            {({ selected, active, ...menuitem }, ref) => {
              const classes = mergeItemClassNames(
                className,
                prefixItemClassName(`pull-${rtl ? 'left' : 'right'}`),
                prefixItemClassName`toggle`,
                prefixItemClassName`submenu`,
                withItemClassPrefix({
                  [sidenavExpanded ? 'expand' : 'collapse']: sidenav,
                  'with-icon': icon,
                  open,
                  active: selected,
                  disabled,
                  focus: active
                })
              );

              return (
                <div
                  ref={ref as any}
                  className={classes}
                  data-event-key={eventKey}
                  data-event-key-type={typeof eventKey}
                  {...(menuitem as any)}
                  {...menuButtonProps}
                >
                  {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
                  {title}
                  <Icon className={prefix`toggle-icon`} />
                </div>
              );
            }}
          </MenuItem>
        )}
        onToggleMenu={handleToggleSubmenu}
        {...menuProps}
      />
    );
  }
);

DropdownMenu.displayName = 'Dropdown.Menu';
DropdownMenu.defaultProps = defaultProps;
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
