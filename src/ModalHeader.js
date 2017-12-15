import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import createChainedFunction from './utils/createChainedFunction';

const propTypes = {
  classPrefix: PropTypes.string,
  closeButton: PropTypes.bool,
  onHide: PropTypes.func
};

const defaultProps = {
  classPrefix: 'modal',
  closeButton: true,
  onHide: undefined
};

const contextTypes = {
  onModalHide: PropTypes.func
};

class ModalHeader extends React.Component {
  render() {
    const {
      classPrefix,
      onHide,
      className,
      closeButton,
      children,
      ...props
    } = this.props;

    let classes = classNames(`${classPrefix}-header`, className);
    return (
      <div
        {...props}
        className={classes}
      >
        {closeButton && (
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={createChainedFunction(this.context.onModalHide, onHide)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        )}
        {children}
      </div>
    );
  }
}

ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;
ModalHeader.contextTypes = contextTypes;

export default ModalHeader;
