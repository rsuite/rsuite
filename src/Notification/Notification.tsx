import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { prefix } from '../utils';
import { defaultClassPrefix } from '../utils/prefix';
import NoticeManager, { NoticeManagerProps } from './NoticeManager';
import { NotificationConfigProps } from './Notification.d';

type placementType = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

interface ConfigType {
  placement: placementType;
  top?: number;
  bottom?: number;
}

class Notification {
  props: NotificationConfigProps = {
    top: 24,
    bottom: 24,
    duration: 4500,
    placement: 'topRight',
    classPrefix: defaultClassPrefix('notification'),
    getContainer: null
  };

  _instances: any = {};
  _cacheInstances: any[] = [];

  setProps(nextProps: NotificationConfigProps) {
    this.props = {
      ...this.props,
      ...nextProps
    };
    if (nextProps.top || nextProps.bottom) {
      this._instances = {};
    }
  }
  addPrefix = name => prefix(this.props.classPrefix)(name);

  getPlacementStyle(config: ConfigType): React.CSSProperties {
    const { top, bottom } = config;
    const placement = config.placement || this.props.placement;
    const style: React.CSSProperties = {};
    const [vertical] = _.kebabCase(placement).split('-');

    if (vertical === 'top') {
      style.top = _.isUndefined(top) ? this.props.top : top;
    } else {
      style.bottom = _.isUndefined(top) ? this.props.bottom : bottom;
    }

    return style;
  }
  getInstance(config: ConfigType, callback) {
    const { placement, classPrefix, getContainer } = this.props;
    const style = this.getPlacementStyle(config);

    const nextProps: NoticeManagerProps = {
      style,
      className: classNames(this.addPrefix(_.kebabCase(config.placement || placement))),
      classPrefix,
      getContainer
    };

    NoticeManager.getInstance(nextProps, callback);
  }
  open(config) {
    const description = config.description;
    const placement = config.placement || this.props.placement;
    const duration = config.duration || this.props.duration;
    const content = (
      <div className={this.addPrefix('content')}>
        <div className={this.addPrefix('title')}>{config.title}</div>
        <div className={this.addPrefix('description')}>
          {typeof description === 'function' ? description() : description}
        </div>
      </div>
    );

    const nextProps: NotificationConfigProps = {
      content,
      duration,
      closable: true,
      onClose: config.onClose,
      key: config.key,
      type: config.type,
      ...config
    };

    const instance = this._instances[placement];
    if (!instance) {
      this.getInstance(config, nextInstance => {
        nextInstance.push(nextProps);
        this._instances[placement] = nextInstance;
      });
    } else {
      instance.push(nextProps);
    }

    this._cacheInstances.push([placement, nextProps]);
  }
  close(key: string) {
    if (!this._cacheInstances.length) {
      return;
    }

    if (typeof key !== 'undefined') {
      const find = item => item[1].key === key;
      const [placement] = this._cacheInstances.find(find);
      this._instances[placement].remove(key);
      this._cacheInstances = this._cacheInstances.filter(find);
      return;
    }

    const [placement] = this._cacheInstances.pop();
    this._instances[placement].remove();
  }

  closeAll() {
    for (let key in this._instances) {
      if (typeof this._instances[key].removeAll === 'function') {
        this._instances[key].removeAll();
      }
    }
    this._cacheInstances = [];
  }
}

export default Notification;
