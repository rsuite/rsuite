import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { MESSAGE_STATUS_ICONS } from '@/internals/constants/statusIcons';
import { useClassNames, useIsMounted, useEventCallback } from '@/internals/hooks';
import { oneOf } from '@/internals/propTypes';
import CloseButton from '@/internals/CloseButton';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '@/internals/types';
import { mergeRefs } from '@/internals/utils';
import useDelayedClosure from '../toaster/hooks/useDelayedClosure';

export interface NotificationProps extends WithAsProps {
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
  type?: TypeAttributes.Status;

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
const Notification: RsRefForwardingComponent<'div', NotificationProps> = React.forwardRef(
  (props: NotificationProps, ref) => {
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
    } = props;

    const [display, setDisplay] = useState<TypeAttributes.DisplayState>('show');
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
  }
);

Notification.displayName = 'Notification';
Notification.propTypes = {
  as: PropTypes.elementType,
  duration: PropTypes.number,
  header: PropTypes.node,
  closable: PropTypes.bool,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  type: oneOf(['info', 'success', 'warning', 'error']),
  onClose: PropTypes.func
};

export default Notification;
