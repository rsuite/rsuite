import * as React from 'react';

export interface NotificationConfigProps {
  /** The title of the message box */
  title?: React.ReactNode;

  /** The description of the message box */
  description?: React.ReactNode;

  /** message box duration (Unit: milliseconds) */
  duration?: number;

  /** The placement of the message box. */
  placement?: string;

  /** The distance from the top of the message box */
  top?: number;

  /** The distance from the bottom of the message box */
  bottom?: number;

  /** The message box is uniquely identified, and you must fill out the field if you want to manually remove the message box. */
  key?: string;

  /** Closes the callback function */
  onClose?: () => void;
}

export interface NotificationAPI {
  open(config: NotificationConfigProps): void;
  info(config: NotificationConfigProps): void;
  success(config: NotificationConfigProps): void;
  warning(config: NotificationConfigProps): void;
  error(config: NotificationConfigProps): void;
  remove(key: string): void;
}

declare const Notification: NotificationAPI;

export default Notification;
