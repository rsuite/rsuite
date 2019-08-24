import * as React from 'react';
import _ from 'lodash';

import Notification from './Notification';
import Icon from '../Icon';
import { STATUS_ICON_NAMES } from '../constants';
import { getClassNamePrefix } from '../utils/prefix';
import { NotificationProps } from './Notification.d';

const classPrefix = `${getClassNamePrefix()}notification`;
const notification = new Notification();

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

const closeActions = {
  close: (key: string) => {
    notification.close(key);
  },
  closeAll: () => {
    notification.closeAll();
  }
};

function proxy(type: string, config: NotificationProps) {
  notification.open({
    ...config,
    type,
    title: appendIcon(type, config.title)
  });

  return closeActions;
}

const sendMessage: any = _.curry(proxy);

export default {
  open: sendMessage('open'),
  info: sendMessage('info'),
  success: sendMessage('success'),
  warning: sendMessage('warning'),
  error: sendMessage('error'),
  ...closeActions
};
