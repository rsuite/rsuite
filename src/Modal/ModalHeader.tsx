import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { createChainedFunction, defaultProps, prefix } from '../utils';
import ModalContext from './ModalContext';
import { ModalHeaderProps } from './ModalHeader.d';

class ModalHeader extends React.Component<ModalHeaderProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    closeButton: PropTypes.bool,
    children: PropTypes.node,
    onHide: PropTypes.func
  };
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
            onClick={createChainedFunction<(event: React.MouseEvent) => void>(
              onHide,
              context ? context.onModalHide : null
            )}
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
