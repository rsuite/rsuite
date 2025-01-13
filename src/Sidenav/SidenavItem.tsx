import React, { useContext, useCallback } from 'react';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import Ripple from '@/internals/Ripple';
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

export interface SidenavItemProps<T = any>
  extends WithAsProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Activation status */
  active?: boolean;

  /** Set the icon */
  icon?: React.ReactElement<IconProps>;

  /** Whether or not component is disabled */
  disabled?: boolean;

  /** The value of the current option */
  eventKey?: T;

  /** Selected callback function */
  onSelect?: (eventKey: T, event: React.MouseEvent) => void;

  divider?: boolean;

  panel?: boolean;

  /**
   * Content of the tooltip
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
    children,
    className,
    disabled,
    classPrefix = 'sidenav-item',
    icon,
    eventKey,
    style,
    onClick,
    onSelect,
    divider,
    panel,
    tooltip = children,
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

  if (!sidenav.expanded) {
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
                  {children}
                  <Ripple />
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
      {children}
      <Ripple />
    </Component>
  );
});

SidenavItem.displayName = 'Sidenav.Item';

export default SidenavItem;
