import * as React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { prefix, placementPolyfill } from '../utils';
import { defaultClassPrefix } from '../utils/prefix';
import NoticeManager, { NoticeManagerProps } from './NoticeManager';
import { NotificationProps, PlacementType } from './Notification.d';
import { MessageProps } from './Message';

interface ConfigType {
  placement: PlacementType;
  top?: number;
  bottom?: number;
}

class Notification {
  props: NotificationProps = {
    top: 24,
    bottom: 24,
    duration: 4500,
    placement: 'topEnd',
    classPrefix: defaultClassPrefix('notification'),
    getContainer: null
  };

  _instances: any = {};
  _cacheInstances: any[] = [];

  setProps(nextProps: NotificationProps) {
    this.props = {
      ...this.props,
      ...nextProps
    };
    if (nextProps.top || nextProps.bottom) {
      this._instances = {};
    }
  }
  addPrefix = name => prefix(this.props.classPrefix)(name);

  getPlacement(placement: PlacementType): PlacementType {
    return placementPolyfill<PlacementType>(placement || this.props.placement);
  }

  getPlacementStyle(config: ConfigType): React.CSSProperties {
    const { top, bottom } = config;
    const placement = this.getPlacement(config.placement);
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
    const { classPrefix, getContainer } = this.props;
    const style = this.getPlacementStyle(config);
    const placement = this.getPlacement(config.placement);

    const nextProps: NoticeManagerProps = {
      style,
      className: classNames(this.addPrefix(_.kebabCase(placement))),
      classPrefix,
      getContainer
    };

    NoticeManager.getInstance(nextProps, callback);
  }
  open(nextProps: NotificationProps) {
    const {
      description,
      onClose,
      placement: priorPlacement,
      duration = this.props.duration,
      ...rest
    } = nextProps;

    const placement = this.getPlacement(priorPlacement);

    const content = (
      <div className={this.addPrefix('content')}>
        <div className={this.addPrefix('title')}>{nextProps.title}</div>
        <div className={this.addPrefix('description')}>
          {typeof description === 'function' ? description() : description}
        </div>
      </div>
    );

    const config: ConfigType = {
      placement,
      top: nextProps.top,
      bottom: nextProps.bottom
    };

    const itemProps: MessageProps = {
      closable: true,
      content,
      duration,
      onClose,
      ...rest
    };

    const instance = this._instances[placement];
    if (!instance) {
      this.getInstance(config, nextInstance => {
        nextInstance.push(itemProps);
        this._instances[placement] = nextInstance;
      });
    } else {
      instance.push(itemProps);
    }

    this._cacheInstances.push([placement, itemProps]);
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
    for (const key in this._instances) {
      if (typeof this._instances[key].removeAll === 'function') {
        this._instances[key].removeAll();
      }
    }
    this._cacheInstances = [];
  }
}

export default Notification;
