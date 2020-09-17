import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultProps } from '../utils';
import { ModalBodyProps } from './ModalBody.d';
import ModalContext from './ModalContext';

class ModalBody extends React.Component<ModalBodyProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    className: PropTypes.string
  };
  render() {
    const { classPrefix, className, style, ...props } = this.props;
    const classes = classNames(classPrefix, className);

    return (
      <ModalContext.Consumer>
        {context => {
          const bodyStyles = context ? context.getBodyStyles() : {};
          return <div {...props} style={{ ...bodyStyles, ...style }} className={classes} />;
        }}
      </ModalContext.Consumer>
    );
  }
}

export default defaultProps({
  classPrefix: 'modal-body'
})(ModalBody);
