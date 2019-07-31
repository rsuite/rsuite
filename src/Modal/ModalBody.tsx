import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';

import { defaultProps } from '../utils';
import { ModalBodyProps } from './ModalBody.d';

class ModalBody extends React.Component<ModalBodyProps> {
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

const EnhancedModalBody = defaultProps({
  classPrefix: 'modal-body'
})(ModalBody);

export default setDisplayName('ModalBody')(EnhancedModalBody);
