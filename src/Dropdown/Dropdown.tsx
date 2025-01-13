import React, { useContext, useMemo, useReducer } from 'react';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import Button from '../Button';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';
import DropdownSeparator from './DropdownSeparator';
import DropdownContext, { DropdownContextProps } from './DropdownContext';
import Menu, { MenuButtonTrigger } from '@/internals/Menu/Menu';
import DropdownToggle from './DropdownToggle';
import kebabCase from 'lodash/kebabCase';
import NavContext from '../Nav/NavContext';
import Nav from '../Nav';
import { useClassNames } from '@/internals/hooks';
import { forwardRef, mergeRefs, placementPolyfill, warnOnce } from '@/internals/utils';
import { IconProps } from '@rsuite/icons/Icon';
import { initialState, reducer } from './DropdownState';
import { useCustom } from '../CustomProvider';
import type {
  PlacementCorners,
  WithAsProps,
  InternalRefForwardingComponent
} from '@/internals/types';

export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';
export interface DropdownProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'onToggle' | 'title'> {
  /** Define the title as a submenu */
  title?: React.ReactNode;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** The option to activate the state, corresponding to the eventkey in the Dropdown.item */
  activeKey?: T;

  /** Triggering events */
  trigger?: DropdownTrigger | DropdownTrigger[];

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

const Subcomponents = {
  Item: DropdownItem,
  Menu: DropdownMenu,
  Separator: DropdownSeparator
};

export interface DropdownComponent extends InternalRefForwardingComponent<'div', DropdownProps> {
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
  Separator: typeof DropdownSeparator;
}

/**
 * The `Dropdown` component is used to select an option from a set of options.
 * @see https://rsuitejs.com/components/dropdown
 *
 * The `<Dropdown>` API
 * - When used inside `<Sidenav>`, renders a `<TreeviewRootItem>`;
 * - Otherwise renders a `<MenuRoot>`
 */
const Dropdown: DropdownComponent = forwardRef<'div', DropdownProps, typeof Subcomponents>(
  (props, ref) => {
    const { propsWithDefaults } = useCustom('Dropdown', props);
    const {
      as: Component = 'div',
      activeKey,
      title,
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
      onClose,
      onOpen,
      onToggle,
      onSelect,
      ...toggleProps
    } = propsWithDefaults;

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
  },
  Subcomponents
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;
