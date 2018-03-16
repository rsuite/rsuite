// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';

import NavbarBody from './NavbarBody';
import NavbarHeader from './NavbarHeader';

import { prefix, defaultProps } from './utils';

type Props = {
  classPrefix?: string,
  className?: string,
  appearance: 'default' | 'inverse' | 'subtle',
  componentClass: React.ElementType
};

class Navbar extends React.Component<Props> {
  static defaultProps = {
    appearance: 'default'
  };

  static childContextTypes = {
    navbar: PropTypes.bool
  };

  getChildContext() {
    return {
      navbar: true
    };
  }

  render() {
    const { className, componentClass: Component, classPrefix, appearance, ...props } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(appearance), className);

    return <Component {...props} className={classes} role="navigation" />;
  }
}

const EnhancedNavbar = defaultProps({
  componentClass: 'div',
  classPrefix: 'navbar'
})(Navbar);

setStatic('Header', NavbarHeader)(EnhancedNavbar);
setStatic('Body', NavbarBody)(EnhancedNavbar);

export default EnhancedNavbar;
