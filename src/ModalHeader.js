// @flow

import * as React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import createChainedFunction from './utils/createChainedFunction';
import prefix from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string,
  closeButton?: boolean,
  children?: React.Node,
  onHide?: Function
}


class ModalHeader extends React.Component<Props> {

  static contextTypes = {
    onModalHide: PropTypes.func
  };

  static defaultProps = {
    classPrefix: 'modal',
    closeButton: true,
  }

  render() {
    const {
      classPrefix,
      onHide,
      className,
      closeButton,
      children,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(addPrefix('header'), className);

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


export default ModalHeader;
