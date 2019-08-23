import { prefix } from '../utils';
import { defaultClassPrefix } from '../utils/prefix';
import NoticeManager, { NoticeManagerProps } from '../Notification/NoticeManager';
import { AlertConfigProps } from './Alert.d';

class Alert {
  props: AlertConfigProps = {
    duration: 2000,
    top: 5,
    classPrefix: defaultClassPrefix('alert'),
    getContainer: null
  };

  _instance: any = null;

  addPrefix = name => prefix(this.props.classPrefix)(name);

  setProps(nextProps: AlertConfigProps) {
    this.props = {
      ...this.props,
      ...nextProps
    };

    if (nextProps.top !== undefined) {
      this._instance = null;
    }
  }
  getInstance(callback) {
    const { getContainer, top, duration, classPrefix } = this.props;
    const props: NoticeManagerProps = {
      style: { top },
      duration,
      classPrefix,
      getContainer,
      className: this.addPrefix('container')
    };
    NoticeManager.getInstance(props, callback);
  }

  open(content, duration = this.props.duration, onClose, type) {
    if (typeof content === 'function') {
      content = content();
    }

    const nextProps = {
      content,
      duration,
      onClose,
      type,
      closable: true
    };

    if (!this._instance) {
      this.getInstance(nextInstance => {
        this._instance = nextInstance;
        this._instance.push(nextProps);
      });
    } else {
      this._instance.push(nextProps);
    }
  }
  close(key: string) {
    if (this._instance) {
      this._instance.remove(key);
    }
  }

  closeAll() {
    if (this._instance) {
      this._instance.removeAll();
    }
  }
}

export default Alert;
