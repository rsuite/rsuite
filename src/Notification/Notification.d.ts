import * as React from 'react';
import { StandardProps } from '../@types/common';

export type PlacementType = 'topStart' | 'topEnd' | 'bottomStart' | 'bottomEnd';

export interface NotificationProps extends StandardProps {
  /** The title of the message box */
  title?: React.ReactNode;

  /** The description of the message box */
  description?: React.ReactNode;

  /** message box duration (Unit: milliseconds) */
  duration?: number;

  /** The placement of the message box. */
  placement?: PlacementType;

  /** The distance from the top of the message box */
  top?: number;

  /** The distance from the bottom of the message box */
  bottom?: number;

  /** The message box is uniquely identified, and you must fill out the field if you want to manually remove the message box. */
  key?: string;

  /** Closes the callback function */
  onClose?: () => void;

  /** The parent container of Notification */
  getContainer?: () => HTMLElement;
}

export interface NotificationAPI {
  open(config: NotificationProps): void;
  info(config: NotificationProps): void;
  success(config: NotificationProps): void;
  warning(config: NotificationProps): void;
  error(config: NotificationProps): void;
  close(key?: string): void;
  closeAll(): void;
}

declare const Notification: NotificationAPI;

export default Notification;
