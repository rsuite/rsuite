import React, { useRef, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import DropdownToggle from '../Dropdown/DropdownToggle';
import DropdownMenu from '../Dropdown/DropdownMenu';
import {
  shallowEqual,
  createChainedFunction,
  isOneOf,
  useClassNames,
  placementPolyfill,
  PLACEMENT_8,
  useRootClose,
  KEY_VALUES,
  appendTooltip
} from '../utils';
import { SidenavContext, SidenavContextType } from './Sidenav';
import { TypeAttributes, WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import useUniqueId from '../utils/useUniqueId';
import useMenuControl from '../Dropdown/useMenuControl';
import deprecatePropType from '../utils/deprecatePropType';
import DropdownItem from '../Dropdown/DropdownItem';
import SafeAnchor from '../SafeAnchor';
import Ripple from '../Ripple';
import TreeviewItemGroup from './TreeviewItemGroup';
import TreeviewItemContext from './TreeviewItemContext';

export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface TreeviewRootItemProps<T = any>
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
   * Open the menu and control it
   * @deprecated
   */
  open?: boolean;

  /** Whether Dropdown menu shows header  */
  showHeader?: boolean;

  /** Custom title */
  renderTitle?: (children?: React.ReactNode) => React.ReactNode;

  /** The callback function that the menu closes */
  onClose?: () => void;

  /** Menu Pop-up callback function */
  onOpen?: () => void;

  /** Callback function for menu state switching */
  onToggle?: (open?: boolean) => void;

  /** Selected callback function */
  onSelect?: (eventKey: T, event: React.MouseEvent<HTMLElement>) => void;
}

export interface DropdownComponent extends RsRefForwardingComponent<'div', TreeviewRootItemProps> {
  Item: typeof DropdownItem;
  Menu: typeof DropdownMenu;
}

const defaultProps: Partial<TreeviewRootItemProps> = {
  as: 'div',
  classPrefix: 'dropdown',
  placement: 'bottomStart',
  trigger: 'click',
  tabIndex: 0
};

const TreeviewRootItem: DropdownComponent = (React.forwardRef<HTMLLIElement>(
  (props: TreeviewRootItemProps, ref) => {
    const {
      as: Component,
      title,
      children,
      className,
      menuStyle,
      disabled,
      renderTitle,
      classPrefix,
      placement,
      activeKey,
      toggleClassName,
      trigger,
      icon,
      eventKey,
      toggleAs,
      noCaret,
      style,
      showHeader,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onContextMenu,
      onSelect,
      onOpen,
      onClose,
      onToggle,
      ...rest
    } = props;

    const { onOpenChange, openKeys = [], sidenav, expanded, onSelect: onSidenavSelect } =
      useContext<SidenavContextType>(SidenavContext) || {};
    const overlayTarget = useRef<HTMLUListElement>();
    const triggerTarget = useRef<HTMLButtonElement>();
    const menuControl = useMenuControl(overlayTarget);

    const open = menuControl.open;
    const treeitemExpanded = openKeys.some(key => shallowEqual(key, eventKey));
    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
    const collapsible = sidenav && expanded;

    const buttonId = useUniqueId(prefix`button-`);
    const menuId = useUniqueId(prefix`menu-`);

    const handleToggle = useCallback(
      (isOpen?: boolean) => {
        const nextOpen = typeof isOpen === 'undefined' ? !open : isOpen;
        const fn = nextOpen ? onOpen : onClose;

        fn?.();
        onToggle?.(nextOpen);
        if (nextOpen) {
          menuControl.openMenu();
        } else {
          menuControl.closeMenu();
        }
      },
      [
        onClose,
        onOpen,
        onToggle,
        open,
        menuControl.focusItemAt,
        menuControl.openMenu,
        menuControl.closeMenu
      ]
    );

    const handleOpenChange = useCallback(
      (event: React.MouseEvent) => {
        onOpenChange?.(eventKey, event);
      },
      [eventKey, onOpenChange]
    );

    const handleToggleChange = useCallback(
      (eventKey: any, event: React.SyntheticEvent<any>) => {
        onOpenChange?.(eventKey, event);
      },
      [onOpenChange]
    );

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();
        if (disabled) {
          return;
        }
        handleToggle();
        onSidenavSelect?.(eventKey, event);
      },
      [disabled, handleToggle, onSidenavSelect, eventKey]
    );

    const handleMouseEnter = useCallback(() => {
      if (!disabled) {
        handleToggle(true);
      }
    }, [disabled, handleToggle]);

    const handleMouseLeave = useCallback(() => {
      if (!disabled) {
        handleToggle(false);
      }
    }, [disabled, handleToggle]);

    const handleSelect = (eventKey: any, event: React.MouseEvent<HTMLElement>) => {
      onSelect?.(eventKey, event);
      handleToggle(false);
    };

    useRootClose(() => handleToggle(), {
      triggerTarget,
      overlayTarget,
      disabled: !open,
      // Don't use global Escape listener
      // Menu implements its own
      listenEscape: false
    });

    const dropdownProps = {
      onMouseEnter,
      onMouseLeave
    };

    /**
     * Keyboard interaction on menu button
     * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-13
     */
    const handleButtonKeydown = useCallback(
      (e: React.KeyboardEvent<HTMLButtonElement>) => {
        switch (e.key) {
          // Open the menu
          case KEY_VALUES.ENTER:
          case KEY_VALUES.SPACE:
            e.preventDefault();
            e.stopPropagation();
            if (!open) {
              handleToggle(true);
              menuControl.focusItemAt(0);
            } else {
              handleToggle(false);
            }
            break;
          // Open the menu (if closed) and move focus to first item
          // This is mostly useful after opening the menu with click
          case KEY_VALUES.DOWN:
            e.preventDefault();
            e.stopPropagation();
            if (!open) {
              handleToggle(true);
            }
            menuControl.focusItemAt(0);
            break;
          default:
            break;
        }
      },
      [open, handleToggle, menuControl]
    );

    const buttonEventHandlers = {
      onClick: createChainedFunction(handleOpenChange, onClick),
      onContextMenu,
      onKeyDown: handleButtonKeydown
    };

    /**
     * Bind event of trigger,
     * not used in  in the expanded state of '<Sidenav>'
     */
    if (!collapsible) {
      if (isOneOf('click', trigger)) {
        buttonEventHandlers.onClick = createChainedFunction(
          handleClick,
          buttonEventHandlers.onClick
        );
      }

      if (isOneOf('contextMenu', trigger)) {
        buttonEventHandlers.onContextMenu = createChainedFunction(handleClick, onContextMenu);
      }

      if (isOneOf('hover', trigger)) {
        dropdownProps.onMouseEnter = createChainedFunction(handleMouseEnter, onMouseEnter);
        dropdownProps.onMouseLeave = createChainedFunction(handleMouseLeave, onMouseLeave);
      }
    }

    // Ref: https://www.w3.org/TR/wai-aria-practices-1.2/#wai-aria-roles-states-and-properties-14
    const buttonAriaAttributes = {
      role: 'button',
      'aria-haspopup': 'menu',
      'aria-expanded': open || undefined, // it's recommend to remove aria-expanded when menu is hidden
      'aria-controls': menuId
    };

    if (sidenav) {
      delete buttonAriaAttributes['aria-haspopup'];
      delete buttonAriaAttributes['aria-expanded'];
      delete buttonAriaAttributes['aria-controls'];
    }

    const toggleElement = (
      <DropdownToggle
        {...rest}
        {...buttonEventHandlers}
        id={buttonId}
        {...buttonAriaAttributes}
        ref={triggerTarget}
        as={renderTitle ? 'span' : toggleAs}
        noCaret={noCaret}
        className={toggleClassName}
        renderTitle={renderTitle}
        icon={icon}
        placement={placement}
        inSidenav={sidenav}
      >
        {title}
      </DropdownToggle>
    );

    /**
     * Keyboard interaction on menu
     * @see https://www.w3.org/TR/wai-aria-practices-1.2/#keyboard-interaction-12
     */
    const handleMenuKeydown = useCallback(
      (e: React.KeyboardEvent<HTMLUListElement>) => {
        switch (e.key) {
          // Close the menu
          case KEY_VALUES.ESC:
            e.preventDefault();
            e.stopPropagation();
            handleToggle(false);
            requestAnimationFrame(() => {
              // Move focus back to button
              triggerTarget.current.focus();
            });
            break;
          default:
            break;
        }
      },
      [handleToggle]
    );

    const menuEventHandlers: React.HTMLAttributes<HTMLUListElement> = {
      onKeyDown: handleMenuKeydown
    };

    const menuAriaAttributes: React.HTMLAttributes<HTMLElement> = {
      'aria-labelledby': buttonId
    };

    const menuElement = children && (
      <TreeviewItemGroup
        expanded={treeitemExpanded}
        style={menuStyle}
        onSelect={handleSelect as any}
        onToggle={handleToggleChange}
        collapsible={collapsible}
        activeKey={activeKey}
        openKeys={openKeys}
        ref={overlayTarget}
        hidden={!open}
        {...{ id: menuId, ...menuAriaAttributes }}
        {...menuEventHandlers}
      >
        {showHeader && <li className={prefix('header')}>{title}</li>}
        {children}
      </TreeviewItemGroup>
    );

    const classes = merge(
      className,
      withClassPrefix({
        [`placement-${kebabCase(placementPolyfill(placement))}`]: placement,
        [treeitemExpanded ? 'expand' : 'collapse']: sidenav,
        disabled,
        open,
        'no-caret': noCaret
      })
    );

    const treeitemAriaAttributes: React.HTMLAttributes<HTMLElement> = {
      role: 'treeitem',
      'aria-level': 1
    };

    // Nav.Item

    const handleNavItemClick = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (!disabled) {
          onSelect?.(eventKey, event);
          onSidenavSelect?.(eventKey, event);
          onClick?.(event);
        }
      },
      [disabled, onSelect, eventKey, onClick, onSidenavSelect]
    );
    if (!children) {
      const {
        active,
        disabled,
        className,
        style,
        children,
        icon,
        tabIndex,
        tooltip,
        divider,
        panel,
        title,
        ...rest
      } = props as any;

      const classes = merge(className, withClassPrefix({ active, disabled }));

      if (divider) {
        return (
          <li
            ref={ref}
            role="separator"
            style={style}
            className={merge(className, prefix('divider'))}
          />
        );
      }

      if (panel) {
        return (
          <li ref={ref} style={style} className={merge(className, prefix('panel'))}>
            {title}
          </li>
        );
      }

      const item = (
        <TreeviewItemContext.Provider value={{ level: 1 }}>
          <Component
            aria-selected={active}
            {...rest}
            tabIndex={tabIndex}
            disabled={Component === SafeAnchor ? disabled : null}
            className={classes}
            onClick={handleNavItemClick}
            ref={ref}
            style={style}
            {...treeitemAriaAttributes}
          >
            {icon}
            {title}
            <Ripple />
          </Component>
        </TreeviewItemContext.Provider>
      );

      return tooltip
        ? appendTooltip({
            ref,
            children: item,
            message: children,
            placement: typeof tooltip === 'boolean' ? 'right' : tooltip
          })
        : item;
    }
    treeitemAriaAttributes['aria-expanded'] = treeitemExpanded;
    return (
      <TreeviewItemContext.Provider value={{ level: 1 }}>
        <Component
          {...dropdownProps}
          ref={ref}
          style={style}
          className={classes}
          {...treeitemAriaAttributes}
        >
          {toggleElement}
          {menuElement}
        </Component>
      </TreeviewItemContext.Provider>
    );
  }
) as unknown) as DropdownComponent;

TreeviewRootItem.Item = DropdownItem;
TreeviewRootItem.Menu = DropdownMenu;

TreeviewRootItem.displayName = 'Dropdown';
TreeviewRootItem.defaultProps = defaultProps;
TreeviewRootItem.propTypes = {
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
  tabIndex: PropTypes.number,
  open: deprecatePropType(PropTypes.bool),
  eventKey: PropTypes.any,
  as: PropTypes.elementType,
  toggleAs: PropTypes.elementType,
  noCaret: PropTypes.bool,
  showHeader: PropTypes.bool,
  style: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  onClick: PropTypes.func,
  renderTitle: PropTypes.func
};

export default TreeviewRootItem;
