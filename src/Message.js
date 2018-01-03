// @flow

import * as React from 'react';
import classNames from 'classnames';
import Icon from './Icon';
import prefix, { globalKey } from './utils/prefix';
import type { Types } from './utils/TypeDefinition';
import { StatusIconNames } from './utils/constants';

type Props = {
  type: Types,
  className?: string,
  onClose?: () => void,
  closable?: boolean,
  closeLabel: string,
  title?: React.Node,
  description?: React.Node,
  showIcon?: boolean,
  full?: boolean,
  classPrefix: string
};

type States = {
  display: 'show' | 'hide' | 'hiding',
}

class Message extends React.Component<Props, States> {

  static defaultProps = {
    type: 'info',
    classPrefix: `${globalKey}message`,
    closeLabel: 'Close',
  };

  constructor() {
    super();
    this.state = {
      display: 'show'
    };
  }

  addPrefix(name: string) {
    return prefix(this.props.classPrefix)(name);
  }

  handleClose = () => {
    const { onClose } = this.props;
    this.setState({ display: 'hiding' });

    setTimeout(() => this.setState({ display: 'hide' }, () => {
      onClose && onClose();
    }), 1000);
  }

  renderCloseButton(closeLabel: string) {

    return (
      <button
        type="button"
        className={this.addPrefix('btn-close')}
        onClick={this.handleClose}
      >
        <span aria-hidden="true">&times;</span>
        <span className="sr-only">{closeLabel}</span>
      </button>
    );
  }
  render() {

    const {
      className,
      classPrefix,
      onClose,
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
    const classes = classNames(classPrefix, this.addPrefix(type), {
      [this.addPrefix('has-title')]: hasTitle,
      [this.addPrefix('has-icon')]: showIcon,
      [this.addPrefix('full')]: full,
    }, this.addPrefix(display), className);

    return (
      <div
        {...props}
        className={classes}
      >
        <div className={this.addPrefix('container')}>
          {closable && this.renderCloseButton(closeLabel)}
          {
            showIcon &&
            <div className={this.addPrefix('icon-wrapper')}>
              <Icon icon={StatusIconNames[type]} />
            </div>
          }
          <div className={this.addPrefix('content')}>
            {hasTitle && <h5 className={this.addPrefix('header')}>{title}</h5>}
            {hasDesc && <div className={this.addPrefix('body')} >{description}</div>}
          </div>
        </div>
      </div>
    );
  }
}

export default Message;

