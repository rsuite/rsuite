// @flow

import * as React from 'react';
import { Notify } from 'rsuite-notification';
import Icon from './Icon';

import { StatusIconNames } from './utils/constants';

type Config = {
  title: string,
  description: React.ElementType,
  duration?: number,
  placement?: string,
  top?: number,
  bottom?: number,
  onClose?: () => void,
  style?: Object,
  key?: string
};

function appendIcon(type: string, content: string) {
  return (
    <p><Icon icon={StatusIconNames[type]} />{content}</p>
  );
}

export default {
  open(config: Config) {
    Notify.open(config);
  },
  info(config: Config) {
    Notify.info(config);
  },
  success(config: Config) {
    Notify.success(config);
  },
  warning(config: Config) {
    Notify.warning(config);
  },
  error(config: Config) {
    Notify.error(config);
  },
  remove(key: string) {
    Notify.config(key);
  }
};
