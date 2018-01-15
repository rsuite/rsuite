// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SidenavBody from './SidenavBody';
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
    classPrefix: PropTypes.string,
    sidenav: PropTypes.bool
  };

  static Body = SidenavBody;
  static Toggle = SidenavToggle;

  getChildContext() {
    return {
      sidenav: true,
      classPrefix: this.props.classPrefix
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

export default Sidenav;
