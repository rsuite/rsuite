import React, { useContext, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import DropdownMenu from './DropdownMenu';
import { mergeRefs, PLACEMENT_8, placementPolyfill, useClassNames } from '../utils';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import deprecatePropType from '../utils/deprecatePropType';
import DropdownItem from './DropdownItem';
import DropdownContext, { DropdownContextProps } from './DropdownContext';
import Menu, { MenuButtonTrigger } from '../Menu/Menu';
import DropdownToggle from './DropdownToggle';
import kebabCase from 'lodash/kebabCase';
import NavContext from '../Nav/NavContext';
import { initialState, reducer } from './DropdownState';
import Button from '../Button';
import warnOnce from '../utils/warnOnce';
import Nav from '../Nav';

export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface DropdownProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** The option to activate the state, corresponding to the eventkey in the Dropdown.item */
  activeKey?: T;

  /** Triggering events */
  trigger?: DropdownTrigger | DropdownTrigger[];

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
   * Controlled open state
   */
  open?: boolean;
  /**
   * Whether dropdown is initially open
   */
  defaultOpen?: boolean;

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
  onToggle?: (open?: boolean) => void;

  /** Selected callback function */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;
}

export interface DropdownComponent extends RsRefForwardingComponent<'div', DropdownProps> {
  // Infer toggleAs props
  <ToggleAs extends React.ElementType = typeof Button>(
    props: DropdownProps & {
      ref?: React.Ref<any>;
      toggleAs?: ToggleAs;
    } & React.ComponentProps<ToggleAs>,
    context: any
  ): JSX.Element | null;

  Item: typeof DropdownItem;
  Menu: typeof DropdownMenu;
}

/**
 * The <Dropdown> API
 * When used inside <Sidenav>, renders a <TreeviewRootItem>;
 * Otherwise renders a <MenuRoot>
 */
const Dropdown: DropdownComponent = React.forwardRef<HTMLElement>((props: DropdownProps, ref) => {
  const { activeKey, onSelect, ...rest } = props;

  const {
    as: Component = 'div',
    title,
    onClose,
    onOpen,
    onToggle,
    trigger = 'click',
    placement = 'bottomStart',
    toggleAs,
    toggleClassName,
    open,
    defaultOpen,
    classPrefix = 'dropdown',
    className,
    disabled,
    children,
    menuStyle,
    style,
    ...toggleProps
  } = rest;

  const nav = useContext(NavContext);

  const { merge, withClassPrefix } = useClassNames(classPrefix);

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
      return [triggerMap[trigger]];
    }

    return trigger.map(t => triggerMap[t]);
  }, [trigger]);

  const [{ items }, dispatch] = useReducer(reducer, initialState);

  const hasSelectedItem = useMemo(() => {
    return items.some(item => item.props.selected);
  }, [items]);

  const dropdownContextValue = useMemo<DropdownContextProps>(() => {
    return { activeKey, onSelect, hasSelectedItem, dispatch };
  }, [activeKey, onSelect, hasSelectedItem, dispatch]);

  // Deprecate <Dropdown> within <Nav> usage
  // in favor of <Nav.Menu> API
  if (nav) {
    warnOnce('Usage of <Dropdown> within <Nav> is deprecated. Replace with <Nav.Menu>');

    return <Nav.Menu ref={ref} {...props} />;
  }

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
        open={open}
        defaultOpen={defaultOpen}
        menuButtonText={title}
        renderMenuButton={renderMenuButton}
        disabled={disabled}
        openMenuOn={menuButtonTriggers}
        renderMenuPopup={({ open, ...popupProps }, popupRef) => {
          const menuClassName = mergeMenuClassName(className, withMenuClassPrefix({}));

          return (
            <ul
              ref={popupRef}
              className={menuClassName}
              style={menuStyle}
              hidden={!open}
              {...popupProps}
            >
              {children}
            </ul>
          );
        }}
        onToggleMenu={open => {
          onToggle?.(open);
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
}) as unknown as DropdownComponent;

Dropdown.Item = DropdownItem;
Dropdown.Menu = DropdownMenu;

Dropdown.displayName = 'Dropdown';
Dropdown.propTypes = {
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

export default Dropdown;
