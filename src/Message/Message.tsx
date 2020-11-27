import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useClassNames, useTimeout, MESSAGE_STATUS_ICONS, STATUS } from '../utils';
import { WithAsProps, TypeAttributes, RsRefForwardingComponent } from '../@types/common';
import CloseButton from '../CloseButton';

export interface MessageProps extends WithAsProps {
  /** The type of the message box. */
  type?: TypeAttributes.Status;

  /** Whether it is possible to close the message box */
  closable?: boolean;

  /**
   * Delay automatic removal of messages.
   * When set to 0, the message is not automatically removed.
   * (Unit: milliseconds)
   */
  duration?: number;

  /** The title of the message  */
  header?: React.ReactNode;

  /** Whether to display an icon */
  showIcon?: boolean;

  /** Fill the container */
  full?: boolean;

  /** Callback after the message is removed */
  onClose?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

type DisplayType = 'show' | 'hide' | 'hiding';

const defaultProps: Partial<MessageProps> = {
  as: 'div',
  classPrefix: 'message',
  type: 'info',
  duration: 2000
};

const Message: RsRefForwardingComponent<'div', MessageProps> = React.forwardRef(
  (props: MessageProps, ref) => {
    const {
      as: Component,
      className,
      classPrefix,
      children,
      closable,
      duration,
      full,
      header,
      type,
      showIcon,
      onClose,
      ...rest
    } = props;

    const [display, setDisplay] = useState<DisplayType>('show');
    const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);

    // Timed close message
    const { clear } = useTimeout(onClose, duration, duration > 0);

    if (display === 'hide') {
      return null;
    }

    const classes = merge(
      className,
      withClassPrefix(type, display, { full, ['has-title']: header, ['has-icon']: showIcon })
    );

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
      setDisplay('hiding');
      onClose?.(event);
      clear();

      setTimeout(() => {
        setDisplay('hide');
      }, 1000);
    };

    return (
      <Component role="alert" {...rest} ref={ref} className={classes}>
        <div className={prefix`container`}>
          {closable && <CloseButton onClick={handleClose} />}
          {showIcon && <div className={prefix`icon-wrapper`}>{MESSAGE_STATUS_ICONS[type]}</div>}
          <div className={prefix`content`}>
            {header && <h5 className={prefix`header`}>{header}</h5>}
            {children && <div className={prefix`body`}>{children}</div>}
          </div>
        </div>
      </Component>
    );
  }
);

Message.displayName = 'Message';
Message.defaultProps = defaultProps;
Message.propTypes = {
  type: PropTypes.oneOf(STATUS),
  className: PropTypes.string,
  onClose: PropTypes.func,
  closable: PropTypes.bool,
  title: PropTypes.node,
  description: PropTypes.node,
  showIcon: PropTypes.bool,
  full: PropTypes.bool,
  classPrefix: PropTypes.string
};

export default Message;
