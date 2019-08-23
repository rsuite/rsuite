import * as React from 'react';
import classNames from 'classnames';
import { prefix } from 'rsuite-utils/lib/utils';

export interface MessageProps {
  duration?: number;
  content?: any;
  onClose?: () => void;
  closable?: boolean;
  classPrefix: string;
  className?: string;
  style?: React.CSSProperties;
  type?: string;
}

class Message extends React.Component<MessageProps> {
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
    const { onClose } = this.props;
    this.clearCloseTimer();
    onClose && onClose();
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  render() {
    const { classPrefix, closable, className, content, style, type = '' } = this.props;
    const nc = this.addPrefix('item');
    const classes = classNames(nc, {
      [this.addPrefix('item-closable')]: closable,
      [`${classPrefix}-${type}`]: !!type
    });

    return (
      <div className={classNames(className, `${nc}-wrapper`)}>
        <div className={classes} style={style}>
          <div className={`${nc}-content`}>{content}</div>
          {closable && (
            <div role="button" tabIndex={-1} onClick={this.close} className={`${nc}-close`}>
              <span className={`${nc}-close-x`} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Message;
