import React, { useContext, useCallback } from 'react';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import SafeAnchor from '../SafeAnchor';
import NavContext, { NavContextProps } from '../Nav/NavContext';
import MenuItem from '@/internals/Menu/MenuItem';
import omit from 'lodash/omit';
import Whisper, { WhisperInstance } from '../Whisper';
import Tooltip from '../Tooltip';
import { forwardRef, shallowEqual, mergeRefs, createChainedFunction } from '@/internals/utils';
import { useClassNames } from '@/internals/hooks';
import { SidenavContext } from './Sidenav';
import type { WithAsProps } from '@/internals/types';
import type { IconProps } from '@rsuite/icons/Icon';

/**
 * Props of SidenavItem component
 */
export interface SidenavItemProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /**
   * Whether the item is activated
   */
  active?: boolean;

  /**
   * The icon displayed next to the item
   */
  icon?: React.ReactElement<IconProps>;

  /**
   * Disable the item
   */
  disabled?: boolean;

  /**
   * The value of the item that is used to identify the item
   */
  eventKey?: T;

  /**
   * The callback function when the item is selected
   */
  onSelect?: (eventKey: T, event: React.MouseEvent) => void;

  /**
   * Render a divider
   */
  divider?: boolean;

  /**
   * Render a panel
   */
  panel?: boolean;

  /**
   * The content of the tooltip
   */
  tooltip?: React.ReactNode;
}

/**
 * @private
 */
const SidenavItem = forwardRef<'li', SidenavItemProps>((props, ref) => {
  const sidenav = useContext(SidenavContext);

  if (!sidenav) {
    throw new Error(
      '<SidenavItem> component is not supposed to be used standalone. Use <Nav.Item> inside <Sidenav> instead.'
    );
  }

  const {
    as: Component = SafeAnchor,
    active: activeProp,
    classPrefix = 'sidenav-item',
    children,
    className,
    disabled,
    divider,
    eventKey,
    icon,
    panel,
    style,
    tooltip = children,
    onClick,
    onSelect,
    ...rest
  } = props;

  const { activeKey, onSelect: onSelectFromNav } = useContext(NavContext) as NavContextProps;
  const { merge, withClassPrefix, prefix } = useClassNames(classPrefix);
  const selected = activeProp ?? (!isNil(eventKey) && shallowEqual(activeKey, eventKey));
  const whisperRef = React.useRef<WhisperInstance>(null);

  const handleClick = useCallback<React.MouseEventHandler<HTMLElement>>(
    event => {
      if (disabled) return;
      whisperRef.current?.close();
      onSelect?.(eventKey, event);
      onSelectFromNav?.(eventKey, event);
      onClick?.(event);
    },
    [disabled, onSelect, onSelectFromNav, eventKey, onClick]
  );

  const clonedIcon = icon
    ? React.cloneElement(icon, {
        className: classNames(prefix('icon'), icon.props.className)
      })
    : null;

  const title =
    typeof children === 'string' ? <span className={prefix('title')}>{children}</span> : children;

  if (!sidenav.expanded) {
    if (panel || divider) {
      return null;
    }

    return (
      <Whisper
        trigger="hover"
        speaker={<Tooltip>{tooltip}</Tooltip>}
        placement="right"
        ref={whisperRef}
      >
        {(triggerProps, triggerRef) => (
          <MenuItem selected={selected} disabled={disabled} onActivate={handleClick}>
            {({ selected, active, ...menuitem }, menuitemRef) => {
              const classes = merge(
                className,
                withClassPrefix({ focus: active, active: selected, disabled })
              );

              // Show tooltip when inside a collapse <Sidenav>
              return (
                <Component
                  ref={mergeRefs(mergeRefs(ref, menuitemRef), triggerRef as any)}
                  disabled={Component === SafeAnchor ? disabled : undefined}
                  className={classes}
                  data-event-key={eventKey}
                  {...omit(rest, ['divider', 'panel'])}
                  {...triggerProps}
                  {...menuitem}
                  onMouseOver={createChainedFunction(
                    menuitem.onMouseOver,
                    triggerProps.onMouseOver
                  )}
                  onMouseOut={createChainedFunction(menuitem.onMouseOut, triggerProps.onMouseOut)}
                >
                  {clonedIcon}
                  {title}
                </Component>
              );
            }}
          </MenuItem>
        )}
      </Whisper>
    );
  }

  if (divider) {
    return (
      <li
        ref={ref}
        role="separator"
        style={style}
        className={merge(className, prefix('divider'))}
        {...rest}
      />
    );
  }

  if (panel) {
    return (
      <li
        ref={ref}
        role="none presentation"
        style={style}
        className={merge(className, prefix('panel'))}
        {...rest}
      >
        {children}
      </li>
    );
  }

  return (
    <Component
      ref={ref as any}
      className={merge(className, withClassPrefix({ active: selected, disabled }))}
      onClick={handleClick}
      style={style}
      aria-selected={selected || undefined}
      data-event-key={eventKey}
      {...rest}
    >
      {clonedIcon}
      {title}
    </Component>
  );
});

SidenavItem.displayName = 'Sidenav.Item';

export default SidenavItem;
