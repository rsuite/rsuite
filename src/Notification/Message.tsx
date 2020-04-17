import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { prefix } from '../utils';

export interface MessageProps {
  duration?: number;
  content?: any;
  closable?: boolean;
  classPrefix?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: string;
  onClose?: () => void;
  htmlElementRef?: React.RefObject<any>;
}

class Message extends React.Component<MessageProps> {
  static propTypes = {
    duration: PropTypes.number,
    content: PropTypes.any,
    closable: PropTypes.bool,
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    onClose: PropTypes.func,
    style: PropTypes.object
  };

  closeTimer = null;
  componentDidMount() {
    const { duration } = this.props;
    if (duration) {
      this.closeTimer = setTimeout(() => {
        this.close();
      }, duration);
    }
  }

  componentWillUnmount() {
    this.clearCloseTimer();
  }

  clearCloseTimer() {
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }

  close = () => {
    this.clearCloseTimer();
    this.props.onClose?.();
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  render() {
    const {
      classPrefix,
      closable,
      className,
      content,
      style,
      htmlElementRef,
      type = ''
    } = this.props;
    const ns = this.addPrefix('item');
    const classes = classNames(ns, {
      [this.addPrefix('item-closable')]: closable,
      [`${classPrefix}-${type}`]: !!type
    });

    return (
      <div style={style} className={classNames(className, `${ns}-wrapper`)} ref={htmlElementRef}>
        <div className={classes}>
          <div className={`${ns}-content`}>{content}</div>
          {closable && (
            <div role="button" tabIndex={-1} onClick={this.close} className={`${ns}-close`}>
              <span className={`${ns}-close-x`} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Message;
