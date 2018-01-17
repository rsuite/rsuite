// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from 'rsuite-utils/lib/Animation/Transition';
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
    const classes = classNames(classPrefix, addPrefix(appearance), className);
    const addPrefixs = names => names.map(name => addPrefix(name));

    return (
      <Transition
        in={expanded}
        timeout={300}
        exitedClassName={addPrefix('collapse-out')}
        exitingClassName={classNames(addPrefixs(['collapse-out', 'collapsing']))}
        enteredClassName={addPrefix('collapse-in')}
        enteringClassName={classNames(addPrefixs(['collapse-out', 'collapsing']))}
      >
        <Component
          {...props}
          className={classes}
          role="navigation"
        />
      </Transition>
    );
  }

}

export default Sidenav;
