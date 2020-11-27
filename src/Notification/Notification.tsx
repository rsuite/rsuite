import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useTimeout, MESSAGE_STATUS_ICONS } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import CloseButton from '../CloseButton';

export type MessageType = 'info' | 'success' | 'warning' | 'error';

type DisplayType = 'show' | 'hide' | 'hiding';

export interface NotificationProps extends WithAsProps {
  /** Title of the message */
  header?: React.ReactNode;

  /**
   * Delay automatic removal of messages.
   * When set to 0, the message is not automatically removed.
   * (Unit: milliseconds)
   */
  duration?: number;

  /**
   * The remove button is displayed.
   */
  closable?: boolean;

  /** Type of message */
  type?: MessageType;

  /** Callback after the message is removed */
  onClose?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const defaultProps: Partial<NotificationProps> = {
  as: 'div',
  classPrefix: 'notification',
  duration: 4500
};

const Notification: RsRefForwardingComponent<'div', NotificationProps> = React.forwardRef(
  (props: NotificationProps, ref) => {
    const {
      as: Component,
      classPrefix,
      closable,
      duration,
      className,
      type,
      header,
      children,
      onClose,
      ...rest
    } = props;
    const [display, setDisplay] = useState<DisplayType>('show');

    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);

    // Timed close message
    const { clear } = useTimeout(onClose, duration, duration > 0);

    // Click to trigger to close the message
    const handleClose = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        setDisplay('hiding');
        onClose?.(event);
        clear();

        setTimeout(() => {
          setDisplay('hide');
        }, 1000);
      },
      [onClose, clear]
    );

    const renderHeader = useCallback(() => {
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
    }, [header, type, prefix]);

    if (display === 'hide') {
      return null;
    }

    const classes = merge(className, withClassPrefix(type, display, { closable }));

    return (
      <Component role="alert" {...rest} ref={ref} className={classes}>
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
Notification.defaultProps = defaultProps;
Notification.propTypes = {
  as: PropTypes.elementType,
  duration: PropTypes.number,
  header: PropTypes.node,
  closable: PropTypes.bool,
  classPrefix: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  onClose: PropTypes.func
};

export default Notification;
