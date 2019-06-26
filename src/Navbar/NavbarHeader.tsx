import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defaultProps } from '../utils';

export interface NavbarHeaderProps {
  classPrefix?: string;
  className?: string;
}

class NavbarHeader extends React.Component<NavbarHeaderProps> {
  static propTypes = {
    classPrefix: PropTypes.string,
    className: PropTypes.string
  };
  render() {
    const { className, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className);

    return <div {...props} className={classes} />;
  }
}

export default defaultProps<NavbarHeaderProps>({
  classPrefix: 'navbar-header'
})(NavbarHeader);
