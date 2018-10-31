import * as React from 'react';

export interface NotificationConfigProps {
  title: React.ReactNode;
  description: React.ReactType;
  duration?: number;
  placement?: string;
  top?: number;
  bottom?: number;
  onClose?: () => void;
  style?: object;
  key?: string;
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
