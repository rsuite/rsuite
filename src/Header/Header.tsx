import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setDisplayName from 'recompose/setDisplayName';

import { defaultProps } from '../utils';
import { HeaderProps } from './Header.d';

class Header extends React.Component<HeaderProps> {
  static propTypes = {
    className: PropTypes.string,
    classPrefix: PropTypes.string
  };
  render() {
    const { className, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className);
    return <div {...props} className={classes} />;
  }
}

const EnhancedHeader = defaultProps<HeaderProps>({
  classPrefix: 'header'
})(Header);

export default setDisplayName('Header')(EnhancedHeader);
