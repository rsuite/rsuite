import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { mergeRefs, PLACEMENT_8, placementPolyfill, useClassNames } from '../utils';
import { SidenavContext } from './Sidenav';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import deprecatePropType from '../utils/deprecatePropType';
import Menu, { MenuButtonTrigger } from '../Menu/Menu';
import MenuItem from '../Menu/MenuItem';
import kebabCase from 'lodash/kebabCase';
import ExpandedSidenavDropdown from './ExpandedSidenavDropdown';
import Button from '../Button';
import NavContext from '../Nav/NavContext';
import NavDropdownItem from '../Nav/NavDropdownItem';
import NavDropdownMenu from '../Nav/NavDropdownMenu';
import SidenavDropdownToggle from './SidenavDropdownToggle';
import { NavMenuContext } from '../Nav/NavMenu';

export type SidenavDropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface NavDropdownProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Triggering events */
  trigger?: SidenavDropdownTrigger | readonly SidenavDropdownTrigger[];

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
  noCaret?: boolean;

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

export interface SidenavDropdownComponent
  extends RsRefForwardingComponent<'div', NavDropdownProps> {
  // Infer toggleAs props
  <ToggleAs extends React.ElementType = typeof Button>(
    props: NavDropdownProps & {
      ref?: React.Ref<any>;
      toggleAs?: ToggleAs;
    } & React.ComponentProps<ToggleAs>,
    context: any
  ): JSX.Element | null;

  Item: typeof NavDropdownItem;
  Menu: typeof NavDropdownMenu;
}

/**
 * @private this component is not supposed to be used directly
 *          Instead it's rendered by a <Nav.Menu> within a <Sidenav>
 *
 * <Sidenav>
 *   <Nav>
 *     <Nav.Menu> -> This submenu will render <SidenavDropdown> component
 *     </Nav.Menu>
 *   </Nav>
 * </Sidenav>
 */
const SidenavDropdown: SidenavDropdownComponent = React.forwardRef<HTMLElement>(
  (props: NavDropdownProps, ref) => {
    const sidenav = useContext(SidenavContext);
    const nav = useContext(NavContext);
    const navMenu = useContext(NavMenuContext);

    if (!sidenav || !nav || !navMenu) {
      throw new Error(
        '<Sidenav.Dropdown> must be rendered within a <Nav> component within a <Sidenav> component.'
      );
    }

    const {
      as: Component = 'div',
      title,
      onClose,
      onOpen,
      onToggle,
      eventKey,
      trigger = 'click',
      placement = 'bottomStart',
      toggleAs,
      toggleClassName,
      classPrefix = 'dropdown',
      className,
      disabled,
      children,
      menuStyle,
      style,
      ...toggleProps
    } = props;

    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

    const { withClassPrefix: withMenuClassPrefix, merge: mergeMenuClassName } =
      useClassNames('dropdown-menu');

    const { withClassPrefix: withNavItemClassPrefix, merge: mergeNavItemClassNames } =
      useClassNames('nav-item');

    const [{ items }] = navMenu;

    const hasSelectedItems =
      // has items that is active indicated by <Nav activeKey>
      (nav.activeKey && items.some(item => item.eventKey === nav.activeKey)) ||
      // has items that is active indicated by <Nav.Item active>
      items.some(item => item.active);

    const menuButtonTriggers = useMemo<MenuButtonTrigger[] | undefined>(() => {
      if (!trigger) {
        return undefined;
      }

      const triggerMap: { [key: string]: MenuButtonTrigger } = {
        hover: 'mouseover',
        click: 'click',
        contextMenu: 'contextmenu'
      };

      if (!Array.isArray(trigger)) {
        return [triggerMap[trigger as SidenavDropdownTrigger]];
      }

      return trigger.map(t => triggerMap[t]);
    }, [trigger]);

    // Render a disclosure when inside expanded <Sidenav>
    if (sidenav.expanded) {
      return <ExpandedSidenavDropdown ref={ref} {...props} />;
    }

    const renderMenuButton = (menuButtonProps, buttonRef) => (
      <MenuItem disabled={disabled}>
        {({ active, ...menuitemProps }, menuitemRef) => {
          return (
            <SidenavDropdownToggle
              ref={mergeRefs(buttonRef, menuitemRef)}
              as={toggleAs}
              className={mergeNavItemClassNames(
                toggleClassName,
                withNavItemClassPrefix({
                  focus: active
                })
              )}
              {...menuButtonProps}
              {...omit(menuitemProps, ['onClick'])}
              {...omit(toggleProps, 'data-testid')}
            >
              {title}
            </SidenavDropdownToggle>
          );
        }}
      </MenuItem>
    );

    return (
      <Menu
        menuButtonText={title}
        renderMenuButton={renderMenuButton}
        openMenuOn={menuButtonTriggers}
        renderMenuPopup={({ open, ...popupProps }, popupRef) => {
          const menuClassName = mergeMenuClassName(className, withMenuClassPrefix({}));
          // When inside a collapsed <Sidenav>, render a header in menu
          const showHeader = !!sidenav;

          return (
            <ul
              ref={popupRef}
              className={menuClassName}
              style={menuStyle}
              hidden={!open}
              {...popupProps}
            >
              {showHeader && <div className={prefix('header')}>{title}</div>}
              {children}
            </ul>
          );
        }}
        onToggleMenu={(open, event) => {
          onToggle?.(open, eventKey, event);
          sidenav?.onOpenChange(eventKey, event);
          if (open) {
            onOpen?.();
          } else {
            onClose?.();
          }
        }}
      >
        {({ open, ...menuContainer }, menuContainerRef: React.Ref<HTMLElement>) => {
          const classes = merge(
            className,
            withClassPrefix({
              [`placement-${kebabCase(placementPolyfill(placement))}`]: !!placement,
              disabled,
              open,
              submenu: true,
              'selected-within': hasSelectedItems
            })
          );
          return (
            <Component
              ref={mergeRefs(ref, menuContainerRef)}
              className={classes}
              {...menuContainer}
              {...pick(toggleProps, ['data-testid'])}
              style={style}
            />
          );
        }}
      </Menu>
    );
  }
) as unknown as SidenavDropdownComponent;

SidenavDropdown.Item = NavDropdownItem;
SidenavDropdown.Menu = NavDropdownMenu;

SidenavDropdown.displayName = 'Sidenav.Dropdown';
SidenavDropdown.propTypes = {
  activeKey: PropTypes.any,
  classPrefix: PropTypes.string,
  trigger: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.oneOf(['click', 'hover', 'contextMenu'])
  ]),
  placement: PropTypes.oneOf(PLACEMENT_8),
  title: PropTypes.node,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  menuStyle: PropTypes.object,
  className: PropTypes.string,
  toggleClassName: PropTypes.string,
  children: PropTypes.node,
  open: deprecatePropType(PropTypes.bool),
  eventKey: PropTypes.any,
  as: PropTypes.elementType,
  toggleAs: PropTypes.elementType,
  noCaret: PropTypes.bool,
  style: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  onClick: PropTypes.func,
  renderToggle: PropTypes.func
};

export default SidenavDropdown;
