import React, { useCallback, useContext } from 'react';
import isNil from 'lodash/isNil';
import omit from 'lodash/omit';
import SidenavDropdownCollapse from './SidenavDropdownCollapse';
import Ripple from '@/internals/Ripple';
import Disclosure from '@/internals/Disclosure/Disclosure';
import ArrowLeftLine from '@rsuite/icons/ArrowLeftLine';
import ArrowRightLine from '@rsuite/icons/ArrowRightLine';
import { forwardRef, createChainedFunction } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { SidenavContext } from './Sidenav';
import { useCustom } from '../CustomProvider';
import type { WithAsProps } from '@/internals/types';
import type { IconProps } from '@rsuite/icons/Icon';

export interface SidenavDropdownMenuProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLLIElement>, 'title' | 'onSelect'> {
  /** Primary content */
  children?: React.ReactNode;

  /** You can use a custom element for this component */
  as?: React.ElementType;

  /** Disable the current option */
  disabled?: boolean;

  /** The value of the current option */
  eventKey?: T;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Whether the submenu is expanded, used in Sidenav. */
  expanded?: boolean;

  /** Select the callback function for the current option  */
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;

  title?: React.ReactNode;
}

/**
 * Tree View Node
 * @see https://www.w3.org/TR/wai-aria-practices-1.2/#TreeView
 */
const ExpandedSidenavDropdownMenu = forwardRef<'li', SidenavDropdownMenuProps>((props, ref) => {
  const sidenavContext = useContext(SidenavContext);

  if (!sidenavContext) {
    throw new Error(
      '<SidenavDropdownMenu> component is not supposed to be used standalone. Use <Nav.Menu> inside <Sidenav> instead.'
    );
  }
  const {
    as: Component = 'li',
    children,
    disabled,
    className,
    style,
    classPrefix = 'dropdown-item',
    tabIndex,
    icon,
    title,
    eventKey,
    onClick,
    onSelect,
    ...rest
  } = props;

  const { rtl } = useCustom();
  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const { openKeys = [], onOpenChange, onSelect: onSidenavSelect } = sidenavContext;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      onSelect?.(eventKey, event);
      onSidenavSelect?.(eventKey, event);
    },
    [disabled, onSelect, onSidenavSelect, eventKey]
  );

  const menuitemEventHandlers: React.LiHTMLAttributes<HTMLLIElement> = {
    onClick: createChainedFunction(handleClick, onClick)
  };

  const Icon = rtl ? ArrowLeftLine : ArrowRightLine;

  return (
    <Disclosure
      open={!isNil(eventKey) && openKeys.includes(eventKey)}
      onToggle={(_, event) => onOpenChange?.(eventKey, event)}
    >
      {({ open }) => {
        const classes = merge(
          className,
          prefix('submenu'),
          prefix(`pull-${rtl ? 'left' : 'right'}`),
          prefix(open ? 'expand' : 'collapse'),
          withClassPrefix({
            'with-icon': icon,
            // open,
            disabled
          })
        );
        const iconClasses = merge(
          className,
          prefix('toggle-icon'),
          prefix(`${open ? 'expand' : 'collapse'}-icon`)
        );
        return (
          <Component
            ref={ref}
            {...rest}
            tabIndex={disabled ? -1 : tabIndex}
            style={style}
            className={classes}
            {...menuitemEventHandlers}
          >
            <Disclosure.Button>
              {buttonProps => {
                return (
                  <button
                    className={prefix`toggle`}
                    onClick={handleClick}
                    {...omit(buttonProps, ['open'])}
                  >
                    {icon && React.cloneElement(icon, { className: prefix('menu-icon') })}
                    {title}
                    <Icon className={iconClasses} />
                    <Ripple />
                  </button>
                );
              }}
            </Disclosure.Button>
            <Disclosure.Content>
              {({ open }) => {
                return <SidenavDropdownCollapse open={open}>{children}</SidenavDropdownCollapse>;
              }}
            </Disclosure.Content>
          </Component>
        );
      }}
    </Disclosure>
  );
});

ExpandedSidenavDropdownMenu.displayName = 'Sidenav.Dropdown.Menu';

export default ExpandedSidenavDropdownMenu;
