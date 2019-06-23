// @flow

import * as React from 'react';
import { Notify } from 'rsuite-notification';
import _ from 'lodash';
import Icon from './Icon';

import { STATUS_ICON_NAMES } from './utils/constants';
import { getClassNamePrefix } from './utils/prefix';

const classPrefix = `${getClassNamePrefix()}notification`;
const defaultOptions = {
  classPrefix
};

Notify.config(defaultOptions);

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
  if (!STATUS_ICON_NAMES[type]) {
    return content;
  }
  return (
    <div className={`${classPrefix}-title-with-icon`}>
      <Icon icon={STATUS_ICON_NAMES[type]} />
      {content}
    </div>
  );
}

function proxy(type: string, config: Config) {
  config.title = appendIcon(type, config.title);
  Notify[type](config);
}

const sendMessage: any = _.curry(proxy);

export default {
  open: sendMessage('open'),
  info: sendMessage('info'),
  success: sendMessage('success'),
  warning: sendMessage('warning'),
  error: sendMessage('error'),
  remove(key: string) {
    Notify.remove(key);
  }
};
