// @flow

import * as React from 'react';
import classNames from 'classnames';

import { createChainedFunction, defaultProps, prefix } from './utils';
import { ModalContext } from './Modal';

type Props = {
  classPrefix?: string,
  className?: string,
  closeButton?: boolean,
  children?: React.Node,
  onHide?: Function
};

class ModalHeader extends React.Component<Props> {
  static defaultProps = {
    closeButton: true
  };

  render() {
    const { classPrefix, onHide, className, closeButton, children, ...props } = this.props;
    const classes = classNames(classPrefix, className);
    const addPrefix = prefix(classPrefix);

    const buttonElement = (
      <ModalContext.Consumer>
        {context => (
          <button
            type="button"
            className={addPrefix('close')}
            aria-label="Close"
            onClick={createChainedFunction(context ? context.onModalHide : null, onHide)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </ModalContext.Consumer>
    );

    return (
      <div {...props} className={classes}>
        {closeButton && buttonElement}
        {children}
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'modal-header'
})(ModalHeader);
