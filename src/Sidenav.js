// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from 'rsuite-utils/lib/Animation/Transition';
import remove from 'lodash/remove';
import clone from 'lodash/clone';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import SidenavBody from './SidenavBody';
import SidenavHeader from './SidenavHeader';
import SidenavToggle from './SidenavToggle';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';


type Props = {
  classPrefix?: string,
  className?: string,
  expanded: boolean,
  appearance: 'default' | 'inverse' | 'subtle',
  defaultOpenKeys?: Array<any>,
  openKeys?: Array<any>,
  onOpenChange?: (openKeys: Array<any>, event: SyntheticEvent<*>) => void,
}

type States = {
  openKeys?: Array<any>
}

const Component = createComponent('div');

class Sidenav extends React.Component<Props, States> {

  static defaultProps = {
    appearance: 'default',
    expanded: true,
    classPrefix: `${globalKey}sidenav`
  };

  static childContextTypes = {
    openKeys: PropTypes.array,
    expanded: PropTypes.bool,
    sidenav: PropTypes.bool,
    onOpenChange: PropTypes.func
  };

  static Header = SidenavHeader;
  static Body = SidenavBody;
  static Toggle = SidenavToggle;

  constructor(props: Props) {
    super(props);
    this.state = {
      openKeys: props.defaultOpenKeys || []
    };
  }

  getChildContext() {
    const { expanded, openKeys } = this.props;

    return {
      sidenav: true,
      expanded,
      openKeys: isUndefined(openKeys) ? this.state.openKeys : openKeys,
      onOpenChange: this.handleOpenChange
    };
  }

  handleOpenChange = (eventKey: any, event: SyntheticEvent<*>) => {

    const { onOpenChange } = this.props;
    const find = key => isEqual(key, eventKey);
    let openKeys = clone(this.state.openKeys) || [];

    if (openKeys.some(find)) {
      remove(openKeys, find);
    } else {
      openKeys.push(eventKey);
    }

    this.setState({ openKeys });

    onOpenChange && onOpenChange(openKeys, event);
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
