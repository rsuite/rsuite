import * as React from 'react';

import { StandardProps, TypeAttributes } from '../@types/common';

export interface MessageProps extends StandardProps {
  /** The type of the message box. */
  type?: TypeAttributes.Status;

  /** Whether it is possible to close the message box */
  closable?: boolean;

  /** Closes the prompt text on the button */
  closeLabel?: string;

  /** The title of the message  */
  title?: React.ReactNode;

  /** The description information for the message */
  description?: React.ReactNode;

  /** Whether to display an icon */
  showIcon?: boolean;

  /** Fill the container */
  full?: boolean;

  /** Called after the message is closed  */
  onClose?: () => void;
}

declare const Message: React.ComponentType<MessageProps>;

export default Message;
