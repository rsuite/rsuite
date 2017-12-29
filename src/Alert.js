// @flow

import * as React from 'react';
import { Alert } from 'rsuite-notification';
import Icon from './Icon';

import { StatusIconNames } from './utils/constants';

type Options = {
  top?: number,
  duration?: number,
  getContainer?: () => React.ElementType
};

function appendIcon(type: string, content: string) {
  return (
    <p><Icon icon={StatusIconNames[type]} />{content}</p>
  );
}

export default {
  info(content: string, duration?: number, onClose?: () => void) {
    Alert.info(appendIcon('info', content), duration, onClose);
  },
  success(content: string, duration?: number, onClose?: () => void) {
    Alert.success(appendIcon('success', content), duration, onClose);
  },
  warning(content: string, duration?: number, onClose?: () => void) {
    Alert.warning(appendIcon('warning', content), duration, onClose);
  },
  error(content: string, duration?: number, onClose?: () => void) {
    Alert.error(appendIcon('error', content), duration, onClose);
  },
  config(options: Options) {
    Alert.config(options);
  }
};
