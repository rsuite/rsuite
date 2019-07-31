import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { defaultProps, prefix } from '../utils';
import { IconStackProps } from './IconStack.d';

class IconStack extends React.Component<IconStackProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string,
    size: PropTypes.oneOf(['lg', '2x', '3x', '4x', '5x'])
  };
  render() {
    const { className, size, classPrefix, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className, {
      [addPrefix(`size-${size || ''}`)]: size
    });

    return <span {...props} className={classes} />;
  }
}

export default defaultProps<IconStackProps>({
  classPrefix: 'icon-stack'
})(IconStack);
