// @flow

import * as React from 'react';
import { Alert } from 'rsuite-notification';

import Icon from './Icon';
import { STATUS_ICON_NAMES } from './utils/constants';
import { getClassNamePrefix } from './utils/prefix';

const defaultOptions = {
  classPrefix: `${getClassNamePrefix()}notification`
};

Alert.config(defaultOptions);

function appendIcon(type: string, content: string) {
  return (
    <div>
      <Icon icon={STATUS_ICON_NAMES[type]} />
      {content}
    </div>
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
    Alert.config({
      ...defaultOptions,
      ...options
    });
  }
};
