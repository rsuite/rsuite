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
    componentClass: PropTypes.elementType
  };
  render() {
    const { fluid, componentClass: Component, className, classPrefix, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(fluid ? addPrefix('fluid') : classPrefix, className);
    return <Component {...props} className={classes} />;
  }
}

export default defaultProps<GridProps>({
  componentClass: 'div',
  classPrefix: 'grid-container'
})(Grid);
