import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultProps } from '../utils';
import { ModalFooterProps } from './ModalFooter.d';

class ModalFooter extends React.Component<ModalFooterProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    className: PropTypes.string
  };
  render() {
    const { classPrefix, className, ...props } = this.props;
    const classes = classNames(classPrefix, className);
    return <div {...props} className={classes} />;
  }
}

export default defaultProps<ModalFooterProps>({
  classPrefix: 'modal-footer'
})(ModalFooter);
