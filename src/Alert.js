// @flow

import * as React from 'react';
import { Alert } from 'rsuite-notification';

import Icon from './Icon';
import { StatusIconNames } from './utils/constants';

function appendIcon(type: string, content: string) {
  return (
    <p><Icon icon={StatusIconNames[type]} />{content}</p>
  );
}

function proxy(type: string) {
  return (content: string, duration?: number, onClose?: () => void) => {
    Alert[type](appendIcon(type, content), duration, onClose);
  };
}


type Options = {
  top?: number,
  duration?: number,
  getContainer?: () => React.ElementType
};

export default {
  info: proxy('info'),
  success: proxy('success'),
  warning: proxy('warning'),
  error: proxy('error'),
  config(options: Options) {
    Alert.config(options);
  }
};
