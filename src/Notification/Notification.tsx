import * as React from 'react';
import { Notify } from 'rsuite-notification';
import _ from 'lodash';
import Icon from '../Icon';

import { STATUS_ICON_NAMES } from '../constants';
import { getClassNamePrefix } from '../utils/prefix';
import { NotificationConfigProps } from './Notification.d';

const classPrefix = `${getClassNamePrefix()}notification`;
const defaultOptions = {
  classPrefix
};

Notify.config(defaultOptions);

function appendIcon(type: string, content: React.ReactNode): React.ReactNode {
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

function proxy(type: string, config: NotificationConfigProps) {
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
