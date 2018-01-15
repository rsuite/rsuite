// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SidenavBody from './SidenavBody';
import SidenavHeader from './SidenavHeader';
import SidenavToggle from './SidenavToggle';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';

type Props = {
  classPrefix?: string,
  className?: string,
  expanded: boolean,
  appearance: 'default' | 'inverse' | 'subtle'
}

const Component = createComponent('div');

class Sidenav extends React.Component<Props> {

  static defaultProps = {
    appearance: 'default',
    expanded: true,
    classPrefix: `${globalKey}sidenav`
  };

  static childContextTypes = {
    expanded: PropTypes.bool,
    sidenav: PropTypes.bool
  };

  static Header = SidenavHeader;
  static Body = SidenavBody;
  static Toggle = SidenavToggle;

  getChildContext() {
    const { expanded } = this.props;
    return {
      sidenav: true,
      expanded
    };
  }

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
      [addPrefix('expanded')]: expanded,
      [addPrefix('folded')]: !expanded
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

export default Sidenav;
