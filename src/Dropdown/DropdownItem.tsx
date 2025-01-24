import React, { useCallback, useContext, useEffect } from 'react';
import classNames from 'classnames';
import MenuItem from '@/internals/Menu/MenuItem';
import DropdownContext from './DropdownContext';
import isNil from 'lodash/isNil';
import pick from 'lodash/pick';
import Nav from '../Nav';
import NavContext from '../Nav/NavContext';
import Text from '../Text';
import DropdownSeparator, { type DropdownSeparatorProps } from './DropdownSeparator';
import { useClassNames, useInternalId } from '@/internals/hooks';
import { forwardRef, mergeRefs, shallowEqual, warnOnce } from '@/internals/utils';
import { DropdownActionType } from './DropdownState';
import { useRenderDropdownItem } from './useRenderDropdownItem';
import type { IconProps } from '@rsuite/icons/Icon';
import type { WithAsProps } from '@/internals/types';

export interface DropdownMenuItemProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Active the current option */
  active?: boolean;

  /** Primary content */
  children?: React.ReactNode;

  /** You can use a custom element for this component */
  as?: React.ElementType;

  /**
   * Whether to display the divider
   *
   * @deprecated Use dedicated <Dropdown.Separator> component instead
   */
  divider?: boolean;

  /** Disable the current option */
  disabled?: boolean;

  /** The value of the current option */
  eventKey?: T;

  /** Displays a custom panel */
  panel?: boolean;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** The submenu that this menuitem controls (if exists) */
  submenu?: React.ReactElement;

  /**
   * The sub-level menu appears from the right side by default, and when `pullLeft` is set, it appears from the left.
   * @deprecated Submenus are now pointing the same direction.
   */
  pullLeft?: boolean;

  /**
   * Whether the submenu is opened.
   * @deprecated
   * @internal
   */
  open?: boolean;

  /**
   * The dropdown item keyboard shortcut.
   *
   * @version 5.58.0
   */
  shortcut?: React.ReactNode;

  /**
   * Select the callback function for the current option
   */
  onSelect?: (eventKey: T, event: React.SyntheticEvent) => void;
}
/**
 * The `<Dropdown.Item>` API
 * - When used inside `<Sidenav>`, renders a `<TreeviewItem>`
 * - Otherwise renders a `<MenuItem>`
 */
const DropdownItem = forwardRef<'li', DropdownMenuItemProps>(
  (props: DropdownMenuItemProps, ref: React.Ref<any>) => {
    const {
      classPrefix = 'dropdown-item',
      className,
      shortcut,
      active: activeProp,
      eventKey,
      onSelect,
      icon,
      as: Component = 'li',
      divider,
      panel,
      children,
      disabled,
      ...restProps
    } = props;

    const internalId = useInternalId('DropdownItem');

    const nav = useContext(NavContext);
    const dropdown = useContext(DropdownContext);
    const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);

    const handleSelectItem = useCallback(
      (event: React.SyntheticEvent) => {
        onSelect?.(eventKey, event);
        dropdown?.onSelect?.(eventKey, event);
      },
      [onSelect, eventKey, dropdown]
    );

    const selected =
      activeProp || (!isNil(eventKey) && shallowEqual(dropdown?.activeKey, eventKey));

    const dispatch = dropdown?.dispatch;

    useEffect(() => {
      if (dispatch) {
        dispatch({
          type: DropdownActionType.RegisterItem,
          payload: {
            id: internalId,
            props: {
              selected
            }
          }
        });

        return () => {
          dispatch({
            type: DropdownActionType.UnregisterItem,
            payload: {
              id: internalId
            }
          });
        };
      }
    }, [internalId, selected, dispatch]);

    const renderDropdownItem = useRenderDropdownItem(Component);

    // If using <Dropdown.Item> within <Nav>
    // Suggest <Nav.Item>
    if (nav) {
      warnOnce(
        'Usage of <Dropdown.Item> within <Nav> is deprecated. Replace with <Nav.Item> within <Nav.Menu>.'
      );

      return <Nav.Item ref={ref} {...props} />;
    }

    if (divider) {
      return (
        <DropdownSeparator as="li" {...(pick(props, ['data-testid']) as DropdownSeparatorProps)} />
      );
    }

    if (panel) {
      return renderDropdownItem({
        ref,
        className: merge(prefix('panel'), className),
        children,
        ...restProps
      });
    }

    return (
      <MenuItem selected={selected} disabled={disabled} onActivate={handleSelectItem}>
        {({ selected, active, ...menuitem }, menuitemRef) => {
          const classes = merge(
            className,
            withClassPrefix({
              'with-icon': icon,
              active: selected,
              disabled,
              focus: active,
              divider,
              panel
            })
          );

          const dataAttributes: { [key: string]: any } = {
            'data-event-key': eventKey
          };

          if (!isNil(eventKey) && typeof eventKey !== 'string') {
            dataAttributes['data-event-key-type'] = typeof eventKey;
          }

          return renderDropdownItem({
            ref: mergeRefs(ref, menuitemRef),
            className: classes,
            ...menuitem,
            ...dataAttributes,
            ...restProps,
            children: (
              <>
                {icon &&
                  React.cloneElement(icon, {
                    className: classNames(prefix('menu-icon'), icon.props.className)
                  })}
                <Text as="span" className={prefix('content')}>
                  {children}
                </Text>
                {shortcut && (
                  <Text as="kbd" className={prefix('shortcut')} muted>
                    {shortcut}
                  </Text>
                )}
              </>
            )
          });
        }}
      </MenuItem>
    );
  }
);

DropdownItem.displayName = 'Dropdown.Item';

export default DropdownItem;
