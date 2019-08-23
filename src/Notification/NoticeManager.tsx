import * as React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Transition } from 'rsuite-utils/lib/Animation';
import { prefix, createChainedFunction } from '../utils';
import { defaultClassPrefix } from '../utils/prefix';
import Message from './Message';

let id = 0;
const getUid = () => {
  id += 1;
  return defaultClassPrefix(`notification-${Date.now()}-${id}`);
};

export interface NoticeManagerProps {
  className?: string;
  classPrefix: string;
  style?: React.CSSProperties;
  duration?: number;
  getContainer?: () => HTMLElement;
}

export interface InstanceType {
  component: any;
  push: (noticeProps: any) => void;
  remove: (key: string) => void;
  removeAll: () => void;
  destroy: () => void;
}

interface NoticeType {
  key: string;
  animated: boolean;
  onClose?: () => void;
}

interface NoticeManagerState {
  animated: boolean;
  notices: NoticeType[];
}

class NoticeManager extends React.Component<NoticeManagerProps, NoticeManagerState> {
  static defaultProps = {
    style: {
      top: 5
    }
  };

  static getInstance(props?: NoticeManagerProps, callback?: (options: InstanceType) => void) {
    const { getContainer, ...rest } = props;
    const mountElement = document.createElement('div');
    if (getContainer) {
      const root = getContainer();
      root.appendChild(mountElement);
    } else {
      document.body && document.body.appendChild(mountElement);
    }

    let called = false;

    function ref(notification) {
      if (called) {
        return;
      }
      called = true;
      callback({
        push(noticeProps) {
          notification.add(noticeProps);
        },
        remove(key: string) {
          notification.actualRemove(key);
        },
        removeAll() {
          notification.removeAll();
        },
        component: notification,
        destroy() {
          ReactDOM.unmountComponentAtNode(mountElement);
          document.removeChild(mountElement);
        }
      });
    }

    ReactDOM.render(<NoticeManager {...rest} ref={ref} />, mountElement);
  }

  constructor(props) {
    super(props);
    this.state = {
      animated: false,
      notices: []
    };
  }

  add = notice => {
    const { notices } = this.state;
    let key;
    if (notice.key === undefined || notice.key === null) {
      key = getUid();
    } else {
      key = notice.key;
    }
    notice.key = key;
    notice.animated = true;
    if (!notices.filter(n => n.key === key).length) {
      this.setState({
        notices: notices.concat(notice)
      });
    }
  };

  removeAll = () => {
    const { notices } = this.state;
    this.setState(
      {
        notices: notices.map(n => ({
          ...n,
          animated: false
        }))
      },
      () => {
        setTimeout(() => {
          this.setState({ notices: [] });
        }, 1000);
      }
    );
  };

  getKey(key) {
    const { notices } = this.state;
    if (typeof key === 'undefined' && notices.length) {
      key = notices[notices.length - 1].key;
    }
    return key;
  }

  remove = (key?: string) => {
    const { notices } = this.state;

    key = this.getKey(key);

    const nextNotices = notices.map(n => {
      if (n.key === key) {
        n.animated = false;
      }
      return n;
    });
    const callback = () => {
      setTimeout(() => {
        this.actualRemove(key);
      }, 1000);
    };
    this.setState(
      {
        notices: nextNotices
      },
      callback
    );
  };

  actualRemove = (key: string) => {
    key = this.getKey(key);
    this.setState(prevState => {
      return {
        notices: prevState.notices.filter(notice => notice.key !== key)
      };
    });
  };

  addPrefix = (name: string | string[]) => prefix(this.props.classPrefix)(name);

  render() {
    const { notices } = this.state;
    const { className, style, classPrefix } = this.props;
    const elements = notices.map(item => {
      const { key, animated, onClose, ...rest } = item;
      return (
        <Transition
          key={key}
          in={animated}
          exitedClassName={this.addPrefix('fade-exited')}
          exitingClassName={this.addPrefix(['fade-entered', 'fade-leave-active'])}
          enteringClassName={this.addPrefix('fade-entering')}
          enteredClassName={this.addPrefix('fade-entered')}
          timeout={300}
        >
          <Message
            {...rest}
            classPrefix={classPrefix}
            onClose={createChainedFunction(() => this.remove(key), onClose)}
          />
        </Transition>
      );
    });

    const classes = classNames(classPrefix, className);
    return (
      <div className={classes} style={style}>
        {elements}
      </div>
    );
  }
}

export default NoticeManager;
