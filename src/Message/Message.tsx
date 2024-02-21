import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  useClassNames,
  useTimeout,
  MESSAGE_STATUS_ICONS,
  STATUS,
  useIsMounted,
  useEventCallback
} from '../utils';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../@types/common';
import { oneOf } from '../internals/propTypes';
import CloseButton from '../internals/CloseButton';
import ToastContext from '../toaster/ToastContext';

export interface MessageProps extends WithAsProps {
  /**
   * The type of the message box.
   */
  type?: TypeAttributes.Status;

  /**
   * Show a border around the message box.
   * @version 5.53.0
   */
  bordered?: boolean;

  /**
   * Center the message vertically.
   * @version 5.53.0
   */
  centered?: boolean;

  /**
   * Whether it is possible to close the message box
   */
  closable?: boolean;

  /**
   * Delay automatic removal of messages.
   * When set to 0, the message is not automatically removed.
   * (Unit: milliseconds)
   *
   * @default 2000
   * @deprecated Use `toaster.push(<Message />, { duration: 2000 })` instead.
   *
   */
  duration?: number;

  /**
   * The title of the message
   */
  header?: React.ReactNode;

  /**
   * Whether to display an icon
   */
  showIcon?: boolean;

  /**
   * Fill the container
   */
  full?: boolean;

  /**
   * Callback after the message is removed
   */
  onClose?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

type DisplayType = 'show' | 'hide' | 'hiding';

/**
 * The `Message` component is used to display important messages to users.
 * @see https://rsuitejs.com/components/message
 */
const Message: RsRefForwardingComponent<'div', MessageProps> = React.forwardRef(
  (props: MessageProps, ref) => {
    const {
      as: Component = 'div',
      bordered,
      centered,
      className,
      classPrefix = 'message',
      children,
      closable,
      duration = 2000,
      full,
      header,
      type = 'info',
      showIcon,
      onClose,
      ...rest
    } = props;

    const [display, setDisplay] = useState<DisplayType>('show');
    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
    const isMounted = useIsMounted();
    const { usedToaster } = useContext(ToastContext);

    // Timed close message
    const { clear } = useTimeout(onClose, duration, usedToaster && duration > 0);

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

    const classes = merge(
      className,
      withClassPrefix(type, display, {
        full,
        bordered,
        centered,
        ['has-title']: header,
        ['has-icon']: showIcon
      })
    );

    return (
      <Component role="alert" {...rest} ref={ref} className={classes}>
        <div className={prefix`container`}>
          {closable && <CloseButton onClick={handleClose} />}
          {showIcon && <div className={prefix`icon`}>{MESSAGE_STATUS_ICONS[type]}</div>}
          <div className={prefix`content`}>
            {header && <div className={prefix`header`}>{header}</div>}
            {children && <div className={prefix`body`}>{children}</div>}
          </div>
        </div>
      </Component>
    );
  }
);

Message.displayName = 'Message';
Message.propTypes = {
  bordered: PropTypes.bool,
  centered: PropTypes.bool,
  closable: PropTypes.bool,
  className: PropTypes.string,
  classPrefix: PropTypes.string,
  description: PropTypes.node,
  full: PropTypes.bool,
  onClose: PropTypes.func,
  showIcon: PropTypes.bool,
  title: PropTypes.node,
  type: oneOf(STATUS)
};

export default Message;
