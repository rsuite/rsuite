// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { defaultProps, prefix } from './utils';

type PlacementFourSides = 'top' | 'right' | 'bottom' | 'left';
type PlacementEightPoints =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight'
  | 'leftTop'
  | 'rightTop'
  | 'leftBottom'
  | 'rightBottom';

type Props = {
  htmlFor?: string,
  show?: boolean,
  classPrefix: string,
  children?: React.Node,
  className?: string,
  placement?: PlacementFourSides | PlacementEightPoints
};

class ErrorMessage extends React.Component<Props> {
  static contextTypes = {
    formGroup: PropTypes.object
  };

  render() {
    const controlId = _.get(this.context, 'formGroup.controlId');
    const {
      className,
      htmlFor = controlId,
      show,
      classPrefix,
      children,
      placement,
      ...props
    } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix(`placement-${_.kebabCase(placement)}`)]: placement,
      [addPrefix('show')]: show
    });

    return (
      <div {...props} className={classNames(addPrefix('wrapper'), className)}>
        <div className={classes} htmlFor={htmlFor}>
          <span className={addPrefix('arrow')} />
          <span className={addPrefix('inner')}>{children}</span>
        </div>
      </div>
    );
  }
}

export default defaultProps({
  classPrefix: 'error-message'
})(ErrorMessage);
