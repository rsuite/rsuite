import React, { useCallback, useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import { mergeRefs, PLACEMENT_8, placementPolyfill, useClassNames } from '../utils';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import deprecatePropType from '../utils/deprecatePropType';
import DropdownContext, { DropdownContextProps } from '../Dropdown/DropdownContext';
import DropdownToggle from '../Dropdown/DropdownToggle';
import { initialState, reducer } from '../Dropdown/DropdownState';
import Menu, { MenuButtonTrigger } from '../Menu/Menu';
import kebabCase from 'lodash/kebabCase';
import NavContext from './NavContext';
import Button from '../Button';
import NavDropdownItem from './NavDropdownItem';
import NavDropdownMenu from './NavDropdownMenu';

export type NavDropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface NavDropdownProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** The option to activate the state, corresponding to the eventkey in the Dropdown.item */
  activeKey?: T;

  /** Triggering events */
  trigger?: NavDropdownTrigger | readonly NavDropdownTrigger[];

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

  /** Selected callback function */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

export interface NavDropdownComponent extends RsRefForwardingComponent<'div', NavDropdownProps> {
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
 *          Instead it's rendered by a <Nav.Menu> call
 *
 * <Nav>
 *   <Nav.Menu> -> This will render <NavDropdown> component
 *   </Nav.Menu>
 * </Nav>
 */
const NavDropdown: NavDropdownComponent = React.forwardRef<HTMLElement>(
  (props: NavDropdownProps, ref) => {
    const { activeKey, onSelect: onSelectProp, ...rest } = props;

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
    } = rest;

    const nav = useContext(NavContext);

    if (!nav) {
      throw new Error('<Nav.Dropdown> should be used within a <Nav> component.');
    }

    const { onSelect: onSelectFromNav } = nav;

    const emitSelect = useCallback(
      (eventKey: string | undefined, event: React.SyntheticEvent) => {
        onSelectProp?.(eventKey, event);

        // If <Dropdown> is inside <Nav>, also trigger `onSelect` on <Nav>
        onSelectFromNav?.(eventKey, event);
      },
      [onSelectProp, onSelectFromNav]
    );

    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

    const { withClassPrefix: withMenuClassPrefix, merge: mergeMenuClassName } =
      useClassNames('dropdown-menu');

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
        return [triggerMap[trigger as NavDropdownTrigger]];
      }

      return trigger.map(t => triggerMap[t]);
    }, [trigger]);

    const [{ items }, dispatch] = useReducer(reducer, initialState);

    const hasSelectedItem = useMemo(() => {
      return items.some(item => item.props.selected);
    }, [items]);

    const dropdownContextValue = useMemo<DropdownContextProps>(() => {
      return { activeKey, onSelect: emitSelect, hasSelectedItem, dispatch };
    }, [activeKey, emitSelect, hasSelectedItem, dispatch]);

    const renderMenuButton = (menuButtonProps, menuButtonRef) => (
      <DropdownToggle
        ref={menuButtonRef}
        as={toggleAs}
        className={toggleClassName}
        placement={placement}
        disabled={disabled}
        {...omit(menuButtonProps, ['open'])}
        {...omit(toggleProps, ['data-testid'])}
      >
        {title}
      </DropdownToggle>
    );

    return (
      <DropdownContext.Provider value={dropdownContextValue}>
        <Menu
          menuButtonText={title}
          renderMenuButton={renderMenuButton}
          openMenuOn={menuButtonTriggers}
          renderMenuPopup={({ open, ...popupProps }, popupRef) => {
            const menuClassName = mergeMenuClassName(className, withMenuClassPrefix({}));
            // When inside a collapsed <Sidenav>, render a header in menu
            const showHeader = false;

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
                'selected-within': hasSelectedItem
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
      </DropdownContext.Provider>
    );
  }
) as unknown as NavDropdownComponent;

NavDropdown.Item = NavDropdownItem;
NavDropdown.Menu = NavDropdownMenu;

NavDropdown.displayName = 'Nav.Dropdown';
NavDropdown.propTypes = {
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

export default NavDropdown;
