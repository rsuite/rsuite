import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import isNil from 'lodash/isNil';
import { useClassNames, shallowEqual, mergeRefs, createChainedFunction } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { IconProps } from '@rsuite/icons/lib/Icon';
import Ripple from '../Ripple';
import SafeAnchor from '../SafeAnchor';
import NavContext, { NavContextProps } from '../Nav/NavContext';
import MenuItem from '../Menu/MenuItem';
import omit from 'lodash/omit';
import { SidenavContext } from './Sidenav';
import Whisper, { WhisperInstance } from '../Whisper';
import Tooltip from '../Tooltip';

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
const SidenavItem: RsRefForwardingComponent<'li', SidenavItemProps> = React.forwardRef<
  HTMLLIElement,
  SidenavItemProps
>((props: SidenavItemProps, ref) => {
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
                  {icon && React.cloneElement(icon, { className: prefix('icon') })}
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
      {icon && React.cloneElement(icon, { className: prefix('icon') })}
      {children}
      <Ripple />
    </Component>
  );
});

SidenavItem.displayName = 'Sidenav.Item';
SidenavItem.propTypes = {
  classPrefix: PropTypes.string,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  eventKey: PropTypes.any,
  as: PropTypes.elementType,
  style: PropTypes.object,
  onSelect: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onContextMenu: PropTypes.func,
  onClick: PropTypes.func
};

export default SidenavItem;
