import * as React from 'react';
import Icon from '../Icon';
import Alert from './Alert';
import { STATUS_ICON_NAMES } from '../constants';
import { AlertProps } from './Alert.d';

const alert = new Alert();

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
    alert.close(key);
  },
  closeAll: () => {
    alert.closeAll();
  }
};

function proxy(type: string) {
  return (content: string, duration?: number, onClose?: () => void) => {
    alert.open(type, appendIcon(type, content), duration, onClose);
    return closeActions;
  };
}

export default {
  info: proxy('info'),
  success: proxy('success'),
  warning: proxy('warning'),
  error: proxy('error'),
  config(nextProps: AlertProps) {
    alert.setProps(nextProps);
  },
  ...closeActions
};
