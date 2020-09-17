import * as React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Transition from '../Animation/Transition';
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
  classPrefix?: string;
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
  show: boolean;
  className?: string;
  onClose?: () => void;
}

interface NoticeManagerState {
  show: boolean;
  notices: NoticeType[];
}

class NoticeManager extends React.Component<NoticeManagerProps, NoticeManagerState> {
  static defaultProps = {
    style: {
      top: 5
    }
  };

  static getInstance(props: NoticeManagerProps, callback: (options: InstanceType) => void) {
    const { getContainer, ...rest } = props;
    const mountElement = document.createElement('div');
    const container = typeof getContainer === 'function' ? getContainer() : document.body;

    container.appendChild(mountElement);

    let called = false;

    function ref(ref) {
      if (called) {
        return;
      }
      const instance: InstanceType = {
        push(item) {
          ref.add(item);
        },
        remove(key: string) {
          ref.actualRemove(key);
        },
        removeAll() {
          ref.removeAll();
        },
        component: ref,
        destroy() {
          ReactDOM.unmountComponentAtNode(mountElement);
          document.removeChild(mountElement);
        }
      };

      called = true;
      callback(instance);
    }

    ReactDOM.render(<NoticeManager {...rest} ref={ref} />, mountElement);
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      notices: []
    };
  }

  add = item => {
    const { notices } = this.state;

    item.key = typeof item.key === 'undefined' ? getUid() : item.key;
    item.show = true;

    if (!notices.find(n => n.key === item.key)) {
      this.setState({
        notices: [...notices, item]
      });
    }
  };

  removeAll = () => {
    const { notices } = this.state;
    this.setState(
      {
        notices: notices.map(n => ({
          ...n,
          show: false
        }))
      },
      () => {
        setTimeout(() => {
          const notices = this.state.notices.filter(notice => notice.show === true);
          this.setState({ notices: notices });
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
        n.show = false;
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
      const { key, show, onClose, className: itemClassName, ...itemRest } = item;

      return (
        <Transition
          key={key}
          in={show}
          exitedClassName={this.addPrefix('fade-exited')}
          exitingClassName={this.addPrefix('fade-leave-active')}
          enteringClassName={this.addPrefix('fade-entering')}
          enteredClassName={this.addPrefix('fade-entered')}
          timeout={300}
        >
          {(props, ref) => {
            const { className: transitionClassName, ...rest } = props;
            return (
              <Message
                {...itemRest}
                {...rest}
                className={classNames(itemClassName, transitionClassName)}
                htmlElementRef={ref}
                classPrefix={classPrefix}
                onClose={createChainedFunction(() => this.remove(key), onClose)}
              />
            );
          }}
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
