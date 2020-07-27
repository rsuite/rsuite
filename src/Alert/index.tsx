import * as React from 'react';
import Icon from '../Icon';
import Alert, { AlertProps } from './Alert';
import { STATUS_ICON_NAMES } from '../constants';

export interface AlertAPI {
  /** A message may be formatted to display a positive message */
  success(content: string | React.ReactElement, duration?: number, onClose?: () => void): void;

  /** A message may be formatted to display a negative message */
  error(content: string | React.ReactElement, duration?: number, onClose?: () => void): void;

  /** A message may be formatted to display information */
  info(content: string | React.ReactElement, duration?: number, onClose?: () => void): void;

  /** A message may be formatted to display warning messages */
  warning(content: string | React.ReactElement, duration?: number, onClose?: () => void): void;

  /** Used to configure where the message is displayed */
  config(options: AlertProps): void;

  /** Close the message */
  close(key?: string): void;

  /** Close all messages */
  closeAll(): void;
}

const instance = new Alert();

function appendIcon(type: string, content: string) {
  return (
    <div>
      <Icon icon={STATUS_ICON_NAMES[type]} />
      {content}
    </div>
  );
}

const closeActions = {
  close: (key: string) => {
    instance.close(key);
  },
  closeAll: () => {
    instance.closeAll();
  }
};

function proxy(type: string) {
  return (content: string, duration?: number, onClose?: () => void) => {
    instance.open(type, appendIcon(type, content), duration, onClose);
    return closeActions;
  };
}

const alert: AlertAPI = {
  info: proxy('info'),
  success: proxy('success'),
  warning: proxy('warning'),
  error: proxy('error'),
  config(nextProps: AlertProps) {
    instance.setProps(nextProps);
  },
  ...closeActions
};

export default alert;
