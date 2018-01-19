// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Transition from 'rsuite-utils/lib/Animation/Transition';
import _ from 'lodash';
import SidenavBody from './SidenavBody';
import SidenavHeader from './SidenavHeader';
import SidenavToggle from './SidenavToggle';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';
import getUnhandledProps from './utils/getUnhandledProps';

type Props = {
  classPrefix?: string,
  className?: string,
  expanded: boolean,
  appearance: 'default' | 'inverse' | 'subtle',
  defaultOpenKeys?: Array<any>,
  openKeys?: Array<any>,
  onOpenChange?: (openKeys: Array<any>, event: SyntheticEvent<*>) => void,
  activeKey?: any,
  defaultActiveKey?: any,
  onSelect?: (eventKey: Array<any>, event: SyntheticEvent<*>) => void,
}

type States = {
  activeKey?: any,
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
    activeKey: PropTypes.any,
    openKeys: PropTypes.array,
    expanded: PropTypes.bool,
    sidenav: PropTypes.bool,
    onSelect: PropTypes.func,
    onOpenChange: PropTypes.func
  };

  static Header = SidenavHeader;
  static Body = SidenavBody;
  static Toggle = SidenavToggle;

  constructor(props: Props) {
    super(props);
    this.state = {
      activeKey: props.defaultActiveKey,
      openKeys: props.defaultOpenKeys || []
    };
  }

  getChildContext() {
    const { expanded, openKeys, activeKey } = this.props;

    return {
      expanded,
      sidenav: true,
      activeKey: _.isUndefined(activeKey) ? this.state.activeKey : activeKey,
      openKeys: _.isUndefined(openKeys) ? this.state.openKeys : openKeys,
      onOpenChange: this.handleOpenChange,
      onSelect: this.handleSelect
    };
  }

  handleSelect = (eventKey: any, event: SyntheticEvent<*>) => {
    const { onSelect } = this.props;

    this.setState({ activeKey: eventKey });
    onSelect && onSelect(eventKey, event);
  }

  handleOpenChange = (eventKey: any, event: SyntheticEvent<*>) => {

    const { onOpenChange } = this.props;
    const find = key => _.isEqual(key, eventKey);
    let openKeys = _.clone(this.state.openKeys) || [];

    if (openKeys.some(find)) {
      _.remove(openKeys, find);
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
      openKeys,
      defaultOpenKeys,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(appearance), className);
    const addPrefixs = names => names.map(name => addPrefix(name));
    const unhandled = getUnhandledProps(Sidenav, props);

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
          {...unhandled}
          className={classes}
          role="navigation"
        />
      </Transition>
    );
  }

}

export default Sidenav;
