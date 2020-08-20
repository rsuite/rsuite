import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { useClassNames, useTimeout } from '../utils';
import { WithAsProps, RsRefForwardingComponent } from '../@types/common';
import { STATUS_ICON_NAMES } from '../constants';
import CloseButton from '../CloseButton';

export type MessageType = 'info' | 'success' | 'warning' | 'error';

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
    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const classes = merge(className, withClassPrefix(type, { closable }));

    // Timed close message
    const { clear } = useTimeout(onClose, duration, duration > 0);

    // Click to trigger to close the message
    const handleClese = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        onClose?.(event);
        clear();
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
              <Icon icon={STATUS_ICON_NAMES[type]} />
              {header}
            </div>
          ) : (
            <div className={prefix('title')}>{header}</div>
          )}
        </div>
      );
    }, [header, type, prefix]);

    return (
      <Component role="alert" {...rest} ref={ref} className={classes}>
        <div className={prefix`content`}>
          {renderHeader()}
          <div className={prefix('description')}>
            {typeof children === 'function' ? children() : children}
          </div>
        </div>
        {closable && <CloseButton onClick={handleClese} />}
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
