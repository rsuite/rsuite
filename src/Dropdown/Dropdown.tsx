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
import NavContext from '../Nav/NavContext';
import Nav from '../Nav';
import { useStyles } from '@/internals/hooks';
import { forwardRef, mergeRefs, kebabPlace, warnOnce } from '@/internals/utils';
import { IconProps } from '@rsuite/icons/Icon';
import { initialState, reducer } from './DropdownState';
import { useCustom } from '../CustomProvider';
import type {
  PlacementCorners,
  WithAsProps,
  InternalRefForwardingComponent,
  SanitizedHTMListProps
} from '@/internals/types';

export type DropdownTrigger = 'click' | 'hover' | 'contextMenu';

interface DeprecatedDropdownProps {
  /**
   * Deprecated. Use `renderToggle` instead.
   * @deprecated
   */
  renderTitle?: (children: React.ReactNode) => React.ReactNode;
}

export interface DropdownProps<T = any>
  extends WithAsProps,
    DeprecatedDropdownProps,
    SanitizedHTMListProps {
  /** The active option, corresponding to the eventKey in Dropdown.Item */
  activeKey?: T;

  /** Default open state */
  defaultOpen?: boolean;

  /** Whether to disable the component */
  disabled?: boolean;

  /** The value of the current option */
  eventKey?: T;

  /** Set icon */
  icon?: React.ReactElement<IconProps>;

  /** Menu style */
  menuStyle?: React.CSSProperties;

  /** Do not display caret */
  noCaret?: boolean;

  /** Controlled open state */
  open?: boolean;

  /** Menu position */
  placement?: PlacementCorners;

  /** Define the title of the submenu */
  title?: React.ReactNode;

  /** Toggle component class name */
  toggleClassName?: string;

  /** Custom element type can be used for this toggle component */
  toggleAs?: React.ElementType;

  /** Trigger event */
  trigger?: DropdownTrigger | DropdownTrigger[];

  /** Custom toggle component */
  renderToggle?: (props: WithAsProps, ref: React.Ref<any>) => any;

  /** Callback function for closing the menu */
  onClose?: () => void;

  /** Callback function for opening the menu */
  onOpen?: () => void;

  /** Selection callback function */
  onSelect?: (eventKey: T | undefined, event: React.SyntheticEvent) => void;

  /** Callback function for menu state toggle */
  onToggle?: (open?: boolean) => void;
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
  ): React.ReactElement | null;

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
    const { merge, withPrefix } = useStyles(classPrefix);

    const { withPrefix: withMenuClassPrefix, merge: mergeMenuClassName } =
      useStyles('dropdown-menu');

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
            const classes = merge(className, withPrefix({ disabled, open }));
            return (
              <Component
                ref={mergeRefs(ref, menuContainerRef)}
                className={classes}
                style={style}
                data-placement={kebabPlace(placement)}
                data-active-descendant={hasSelectedItem}
                {...menuContainer}
                {...pick(toggleProps, ['data-testid'])}
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
