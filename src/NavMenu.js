// @flow

import * as React from 'react';
import classNames from 'classnames';
import NavMenuCollapse from './NavMenuCollapse';
import NavMenuToggle from './NavMenuToggle';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string,
  expanded: boolean,
  appearance: 'default' | 'inverse' | 'subtle'
}

const Component = createComponent('div');

class NavMenu extends React.Component<Props> {

  static defaultProps = {
    appearance: 'default',
    expanded: true,
    classPrefix: `${globalKey}nav-menu`
  };


  static Collapse = NavMenuCollapse;
  static Toggle = NavMenuToggle;

  render() {
    const {
      className,
      classPrefix,
      appearance,
      expanded,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);

    const classes = classNames(classPrefix, {
      [addPrefix('expanded')]: expanded
    }, addPrefix(appearance), className);

    return (
      <Component
        {...props}
        className={classes}
        role="navigation"
      />
    );
  }

}

export default NavMenu;
