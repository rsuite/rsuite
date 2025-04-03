import React, { useState } from 'react';
import useDelayedClosure from '../toaster/hooks/useDelayedClosure';
import CloseButton from '@/internals/CloseButton';
import Box, { BoxProps } from '@/internals/Box';
import { MESSAGE_STATUS_ICONS } from '@/internals/constants/statusIcons';
import { useStyles, useIsMounted, useEventCallback } from '@/internals/hooks';
import { forwardRef, mergeRefs } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import type { StatusType, DisplayStateType } from '@/internals/types';

export interface NotificationProps extends Omit<BoxProps, 'children'> {
  children?: React.ReactNode | (() => React.ReactNode);

  /** Title of the message */
  header?: React.ReactNode;

  /**
   * Delay automatic removal of messages.
   * When set to 0, the message is not automatically removed.
   * (Unit: milliseconds)
   *
   * @default 4500
   * @deprecated Use `toaster.push(<Notification />, { duration: 4500 })` instead.
   * @internal
   */
  duration?: number;

  /**
   * The remove button is displayed.
   */
  closable?: boolean;

  /**
   * Type of message
   */
  type?: StatusType;

  /**
   * Callback after the message is removed
   */
  onClose?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * The `Notification` component is used to display global messages and notifications.
 *
 * @see https://rsuitejs.com/components/notification
 */
const Notification = forwardRef<'div', NotificationProps, any, 'children'>((props, ref) => {
  const { propsWithDefaults } = useCustom('Notification', props);
  const {
    as,
    classPrefix = 'notification',
    closable,
    duration = 4500,
    className,
    type,
    header,
    children,
    onClose,
    ...rest
  } = propsWithDefaults;

  const [display, setDisplay] = useState<DisplayStateType>('show');
  const { withPrefix, merge, prefix } = useStyles(classPrefix);
  const isMounted = useIsMounted();
  const targetRef = React.useRef<HTMLDivElement>(null);

  // Timed close message
  const { clear } = useDelayedClosure({ targetRef, onClose, duration });

  // Click to trigger to close the message
  const handleClose = useEventCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setDisplay('hiding');
    onClose?.(event);
    clear();

    setTimeout(() => {
      if (isMounted()) {
        setDisplay('hide');
      }
    }, 1000);
  });

  if (display === 'hide') {
    return null;
  }

  const classes = merge(className, withPrefix(type, { closable }));

  return (
    <Box as={as} role="alert" {...rest} ref={mergeRefs(targetRef, ref)} className={classes}>
      {type && <div className={prefix`icon`}>{MESSAGE_STATUS_ICONS[type]}</div>}
      <div className={prefix`content`}>
        {header && <div className={prefix('header')}>{header}</div>}
        <div className={prefix('description')}>
          {typeof children === 'function' ? children() : children}
        </div>
      </div>
      {closable && <CloseButton onClick={handleClose} />}
    </Box>
  );
});

Notification.displayName = 'Notification';

export default Notification;
