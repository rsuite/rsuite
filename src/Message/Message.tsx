import React, { useState } from 'react';
import CloseButton from '@/internals/CloseButton';
import useDelayedClosure from '../toaster/hooks/useDelayedClosure';
import { mergeRefs, forwardRef } from '@/internals/utils';
import { MESSAGE_STATUS_ICONS } from '@/internals/constants/statusIcons';
import { useClassNames, useIsMounted, useEventCallback } from '@/internals/hooks';
import { useCustom } from '../CustomProvider';
import type { WithAsProps, StatusType, DisplayStateType } from '@/internals/types';

export interface MessageProps extends WithAsProps {
  /**
   * The type of the message box.
   */
  type?: StatusType;

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

/**
 * The `Message` component is used to display important messages to users.
 * @see https://rsuitejs.com/components/message
 */
const Message = forwardRef<'div', MessageProps>((props, ref) => {
  const { propsWithDefaults } = useCustom('Message', props);
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
  } = propsWithDefaults;

  const [display, setDisplay] = useState<DisplayStateType>('show');
  const { withClassPrefix, merge, prefix } = useClassNames(classPrefix);
  const isMounted = useIsMounted();
  const targetRef = React.useRef<HTMLDivElement>(null);

  // Timed close message
  const { clear } = useDelayedClosure({ targetRef, onClose, duration });

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
    <Component role="alert" {...rest} ref={mergeRefs(targetRef, ref)} className={classes}>
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
});

Message.displayName = 'Message';

export default Message;
