import React, { useState } from 'react';
import useDelayedClosure from '../toaster/hooks/useDelayedClosure';
import CloseButton from '@/internals/CloseButton';
import { MESSAGE_STATUS_ICONS } from '@/internals/constants/statusIcons';
import { useClassNames, useIsMounted, useEventCallback } from '@/internals/hooks';
import { forwardRef, mergeRefs } from '@/internals/utils';
import { useCustom } from '../CustomProvider';
import type { WithAsPropsWithoutChildren, StatusType, DisplayStateType } from '@/internals/types';

export interface NotificationProps extends WithAsPropsWithoutChildren {
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
    as: Component = 'div',
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
  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
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

  const renderHeader = () => {
    if (!header) {
      return null;
    }

    return (
      <div className={prefix('title')}>
        {type ? (
          <div className={prefix`title-with-icon`}>
            {MESSAGE_STATUS_ICONS[type]}
            {header}
          </div>
        ) : (
          <div className={prefix('title')}>{header}</div>
        )}
      </div>
    );
  };

  if (display === 'hide') {
    return null;
  }

  const classes = merge(className, withClassPrefix(type, display, { closable }));

  return (
    <Component role="alert" {...rest} ref={mergeRefs(targetRef, ref)} className={classes}>
      <div className={prefix`content`}>
        {renderHeader()}
        <div className={prefix('description')}>
          {typeof children === 'function' ? children() : children}
        </div>
      </div>
      {closable && <CloseButton onClick={handleClose} />}
    </Component>
  );
});

Notification.displayName = 'Notification';

export default Notification;
