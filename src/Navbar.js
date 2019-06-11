// @flow

import * as React from 'react';
import classNames from 'classnames';
import setStatic from 'recompose/setStatic';
import NavbarBody from './NavbarBody';
import NavbarHeader from './NavbarHeader';
import { prefix, defaultProps, createContext } from './utils';

export const NavbarContext = createContext(null);

type Props = {
  classPrefix?: string,
  className?: string,
  appearance: 'default' | 'inverse' | 'subtle',
  componentClass: React.ElementType,
  hasChildContext?: boolean
};

class Navbar extends React.Component<Props> {
  static defaultProps = {
    hasChildContext: true,
    appearance: 'default'
  };

  render() {
    const {
      className,
      componentClass: Component,
      hasChildContext,
      classPrefix,
      appearance,
      ...rest
    } = this.props;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(appearance), className);

    return (
      <NavbarContext.Provider value={hasChildContext}>
        <Component {...rest} className={classes} role="navigation" />
      </NavbarContext.Provider>
    );
  }
}

const EnhancedNavbar = defaultProps({
  componentClass: 'div',
  classPrefix: 'navbar'
})(Navbar);

setStatic('Header', NavbarHeader)(EnhancedNavbar);
setStatic('Body', NavbarBody)(EnhancedNavbar);

export default EnhancedNavbar;
