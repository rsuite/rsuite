import React, { useContext, useCallback } from 'react';
import kebabCase from 'lodash/kebabCase';
import omit from 'lodash/omit';
import NavContext from '../Nav/NavContext';
import SidenavDropdownCollapse from './SidenavDropdownCollapse';
import Disclosure from '@/internals/Disclosure/Disclosure';
import SidenavDropdownToggle from './SidenavDropdownToggle';
import { useClassNames, useInternalId } from '@/internals/hooks';
import { forwardRef, placementPolyfill, mergeRefs } from '@/internals/utils';
import { SidenavContext } from './Sidenav';
import { NavMenuContext } from '../Nav/NavMenu';
import type { PlacementCorners, WithAsProps } from '@/internals/types';
import type { IconProps } from '@rsuite/icons/Icon';

export interface SidenavDropdownProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onToggle' | 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** The placement of Menu */
  placement?: PlacementCorners;

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
  noCaret?: boolean;

  /**
   * Open the menu and control it
   * @deprecated
   */
  open?: boolean;

  /**
   * Custom title
   * @deprecated Use `renderToggle` instead.
   */
  renderTitle?: (children?: React.ReactNode) => React.ReactNode;

  /** Custom Toggle */
  renderToggle?: (props: WithAsProps, ref: React.Ref<any>) => any;

  /** The callback function that the menu closes */
  onClose?: () => void;

  /** Menu Pop-up callback function */
  onOpen?: () => void;

  /** Callback function for menu state switching */
  onToggle?: (open: boolean) => void;
}

const ExpandedSidenavDropdown = forwardRef<'li', SidenavDropdownProps>((props, ref) => {
  const sidenav = useContext(SidenavContext);
  const nav = useContext(NavContext);
  const navMenu = useContext(NavMenuContext);

  if (!sidenav || !nav || !navMenu) {
    throw new Error(
      '<SidenavDropdown> component is not supposed to be used standalone. Use <Nav.Menu> inside <Sidenav> instead.'
    );
  }

  const {
    as: Component = 'div',
    title,
    children,
    className,
    menuStyle,
    disabled,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    renderTitle,
    renderToggle,
    classPrefix = 'dropdown',
    placement = 'bottomStart',
    toggleClassName,
    icon,
    eventKey,
    toggleAs,
    noCaret,
    style,
    onOpen,
    onClose,
    open: openProp,
    onToggle,
    ...rest
  } = props;

  const { merge, withClassPrefix } = useClassNames(classPrefix);

  const internalId = useInternalId('SidenavDropdown');
  const uniqueKey = eventKey ?? internalId;

  const { openKeys = [], onOpenChange } = sidenav;

  const [{ items }] = navMenu;

  const hasSelectedItems =
    // has items that is active indicated by <Nav activeKey>
    (nav.activeKey && items.some(item => item.eventKey === nav.activeKey)) ||
    // has items that is active indicated by <Nav.Item active>
    items.some(item => item.active);

  const handleToggleDisclosure = useCallback(
    (open: boolean, event: React.SyntheticEvent) => {
      if (open) {
        onClose?.();
      } else {
        onOpen?.();
      }

      onToggle?.(open);

      onOpenChange?.(uniqueKey, event);
    },
    [onClose, onOpen, onToggle, uniqueKey, onOpenChange]
  );

  const open = openProp ?? openKeys.includes(uniqueKey);

  return (
    <Disclosure open={open} onToggle={handleToggleDisclosure}>
      {({ open }, containerRef) => {
        const classes = merge(
          className,
          withClassPrefix({
            [`placement-${kebabCase(placementPolyfill(placement))}`]: placement,
            [open ? 'expand' : 'collapse']: true,
            disabled,
            'selected-within': hasSelectedItems
          })
        );

        return (
          <Component
            ref={mergeRefs(ref, containerRef as any)}
            style={style}
            className={classes}
            {...rest}
            data-event-key={eventKey}
          >
            <Disclosure.Button>
              {(buttonProps, buttonRef) => (
                <SidenavDropdownToggle
                  ref={buttonRef}
                  as={toggleAs}
                  noCaret={noCaret}
                  className={toggleClassName}
                  renderToggle={renderToggle}
                  icon={icon}
                  placement={placement}
                  {...omit(buttonProps, ['open'])}
                >
                  {title}
                </SidenavDropdownToggle>
              )}
            </Disclosure.Button>
            <Disclosure.Content>
              {({ open }) => (
                <SidenavDropdownCollapse open={open} style={menuStyle}>
                  {children}
                </SidenavDropdownCollapse>
              )}
            </Disclosure.Content>
          </Component>
        );
      }}
    </Disclosure>
  );
});

ExpandedSidenavDropdown.displayName = 'Sidenav.Dropdown';

export default ExpandedSidenavDropdown;
