import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultProps, prefix } from '../utils';
import { GridProps } from './Grid.d';

class Grid extends React.Component<GridProps> {
  static propTypes = {
    className: PropTypes.string,
    fluid: PropTypes.bool,
    classPrefix: PropTypes.string,
    as: PropTypes.elementType
  };
  render() {
    const { fluid, as: Component, className, classPrefix, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(fluid ? addPrefix('fluid') : classPrefix, className);
    return <Component {...props} className={classes} />;
  }
}

export default defaultProps<GridProps>({
  as: 'div',
  classPrefix: 'grid-container'
})(Grid);
