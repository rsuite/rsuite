import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';
import { ModalTitleProps } from './ModalTitle.d';

class ModalTitle extends React.Component<ModalTitleProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    children: PropTypes.node
  };
  render() {
    const { className, classPrefix, children, ...props } = this.props;
    const classes = classNames(classPrefix, className);
    return (
      <h4 {...props} className={classes}>
        {children}
      </h4>
    );
  }
}

export default defaultProps<ModalTitleProps>({
  classPrefix: 'modal-title'
})(ModalTitle);
