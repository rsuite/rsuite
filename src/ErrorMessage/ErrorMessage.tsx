import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';

import { defaultProps, prefix, placementPolyfill } from '../utils';
import { ErrorMessageProps } from './ErrorMessage.d';
import { PLACEMENT_8 } from '../constants';

class ErrorMessage extends React.Component<ErrorMessageProps> {
  static propTypes = {
    show: PropTypes.bool,
    classPrefix: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    placement: PropTypes.oneOf(PLACEMENT_8)
  };
  render() {
    const { className, show, classPrefix, children, placement, ...props } = this.props;

    if (!show) {
      return null;
    }

    const addPrefix = prefix(classPrefix);
    const wrapClasses = classNames(addPrefix('wrapper'), className, {
      [addPrefix(`placement-${_.kebabCase(placementPolyfill(placement))}`)]: placement
    });
    const classes = classNames(classPrefix, addPrefix('show'));

    return (
      <div {...props} className={wrapClasses}>
        <span className={classes}>
          <span className={addPrefix('arrow')} />
          <span className={addPrefix('inner')}>{children}</span>
        </span>
      </div>
    );
  }
}

export default defaultProps<ErrorMessageProps>({
  classPrefix: 'error-message'
})(ErrorMessage);
