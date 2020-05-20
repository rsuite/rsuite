import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon';

import { STATUS_ICON_NAMES, STATUS } from '../constants';
import { prefix, defaultProps } from '../utils';
import { MessageProps } from './Message.d';

interface MessageState {
  display: 'show' | 'hide' | 'hiding';
}

class Message extends React.Component<MessageProps, MessageState> {
  static propTypes = {
    type: PropTypes.oneOf(STATUS),
    className: PropTypes.string,
    onClose: PropTypes.func,
    closable: PropTypes.bool,
    closeLabel: PropTypes.string,
    title: PropTypes.node,
    description: PropTypes.node,
    showIcon: PropTypes.bool,
    full: PropTypes.bool,
    classPrefix: PropTypes.string
  };
  static defaultProps = {
    type: 'info',
    closeLabel: 'Close'
  };

  constructor(props) {
    super(props);
    this.state = {
      display: 'show'
    };
  }

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  handleClose = () => {
    this.setState({ display: 'hiding' });

    setTimeout(
      () =>
        this.setState({ display: 'hide' }, () => {
          this.props.onClose?.();
        }),
      1000
    );
  };

  renderCloseButton(closeLabel: string) {
    return (
      <button type="button" className={this.addPrefix('btn-close')} onClick={this.handleClose}>
        <span aria-hidden="true">&times;</span>
        <span className="sr-only">{closeLabel}</span>
      </button>
    );
  }
  render() {
    const {
      className,
      classPrefix,
      type,
      title,
      description,
      closeLabel,
      closable,
      full,
      showIcon,
      ...props
    } = this.props;

    const { display } = this.state;

    if (display === 'hide') {
      return null;
    }

    const hasTitle = !!title;
    const hasDesc = !!description;
    const classes = classNames(
      classPrefix,
      className,
      this.addPrefix(type),
      this.addPrefix(display),
      {
        [this.addPrefix('has-title')]: hasTitle,
        [this.addPrefix('has-icon')]: showIcon,
        [this.addPrefix('full')]: full
      }
    );

    return (
      <div {...props} className={classes}>
        <div className={this.addPrefix('container')}>
          {closable && this.renderCloseButton(closeLabel)}
          {showIcon && (
            <div className={this.addPrefix('icon-wrapper')}>
              <Icon icon={STATUS_ICON_NAMES[type]} />
            </div>
          )}
          <div className={this.addPrefix('content')}>
            {hasTitle && <h5 className={this.addPrefix('header')}>{title}</h5>}
            {hasDesc && <div className={this.addPrefix('body')}>{description}</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default defaultProps<MessageProps>({
  classPrefix: 'message'
})(Message);
