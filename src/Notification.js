// @flow

import * as React from 'react';
import { Notify } from 'rsuite-notification';
import curry from 'lodash/curry';
import Icon from './Icon';

import { StatusIconNames } from './utils/constants';

type Config = {
  title: React.Node,
  description: React.ElementType,
  duration?: number,
  placement?: string,
  top?: number,
  bottom?: number,
  onClose?: () => void,
  style?: Object,
  key?: string
};

function appendIcon(type: string, content: React.Node): React.Node {
  if (!StatusIconNames[type]) {
    return content;
  }
  return (
    <p><Icon icon={StatusIconNames[type]} />{content}</p>
  );
}

function proxy(type: string, config: Config) {
  config.title = appendIcon(type, config.title);
  Notify[type](config);
}

const sendMessage = curry(proxy);

export default {
  open: sendMessage('open'),
  info: sendMessage('info'),
  success: sendMessage('success'),
  warning: sendMessage('warning'),
  error: sendMessage('error'),
  remove(key: string) {
    Notify.config(key);
  }
};
