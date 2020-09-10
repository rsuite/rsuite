import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { setStatic } from 'recompose';
import Transition from '../Animation/Transition';
import shallowEqual from '../utils/shallowEqual';
import _ from 'lodash';
import SidenavBody from './SidenavBody';
import SidenavHeader from './SidenavHeader';
import SidenavToggle from './SidenavToggle';
import { prefix, defaultProps, getUnhandledProps, createContext } from '../utils';
import { SidenavProps } from './Sidenav.d';

export const SidenavContext = createContext(null);

interface SidenavState {
  openKeys?: any[];
}

class Sidenav extends React.Component<SidenavProps, SidenavState> {
  static propTypes = {
    classPrefix: PropTypes.string,
    className: PropTypes.string,
    expanded: PropTypes.bool,
    appearance: PropTypes.oneOf(['default', 'inverse', 'subtle']),
    defaultOpenKeys: PropTypes.array,
    openKeys: PropTypes.array,
    onOpenChange: PropTypes.func,
    activeKey: PropTypes.any,
    onSelect: PropTypes.func,
    componentClass: PropTypes.elementType
  };
  static defaultProps = {
    appearance: 'default',
    expanded: true
  };

  constructor(props) {
    super(props);
    this.state = {
      openKeys: props.defaultOpenKeys || []
    };
  }

  getOpenKeys = () => {
    const { openKeys } = this.props;

    if (_.isUndefined(openKeys)) {
      return this.state.openKeys;
    }

    return openKeys;
  };

  handleSelect = (eventKey: any, event: React.MouseEvent) => {
    this.props.onSelect?.(eventKey, event);
  };

  handleOpenChange = (eventKey: any, event: React.MouseEvent) => {
    const find = key => shallowEqual(key, eventKey);
    const openKeys = _.clone(this.getOpenKeys()) || [];

    if (openKeys.some(find)) {
      _.remove(openKeys, find);
    } else {
      openKeys.push(eventKey);
    }

    this.setState({ openKeys });
    this.props.onOpenChange?.(openKeys, event);
  };

  render() {
    const {
      className,
      classPrefix,
      appearance,
      expanded,
      activeKey,
      componentClass: Component,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, addPrefix(appearance), className);
    const unhandled = getUnhandledProps(Sidenav, props);

    return (
      <SidenavContext.Provider
        value={{
          expanded,
          activeKey,
          sidenav: true,
          openKeys: this.getOpenKeys(),
          onOpenChange: this.handleOpenChange,
          onSelect: this.handleSelect
        }}
      >
        <Transition
          in={expanded}
          timeout={300}
          exitedClassName={addPrefix('collapse-out')}
          exitingClassName={addPrefix(['collapse-out', 'collapsing'])}
          enteredClassName={addPrefix('collapse-in')}
          enteringClassName={addPrefix(['collapse-in', 'collapsing'])}
        >
          {(props, ref) => {
            const { className, ...rest } = props;
            return (
              <Component
                {...rest}
                {...unhandled}
                ref={ref}
                className={classNames(classes, className)}
                role="navigation"
              />
            );
          }}
        </Transition>
      </SidenavContext.Provider>
    );
  }
}

const EnhancedSidenav = defaultProps<SidenavProps>({
  classPrefix: 'sidenav',
  componentClass: 'div'
})(Sidenav);

setStatic('Header', SidenavHeader)(EnhancedSidenav);
setStatic('Body', SidenavBody)(EnhancedSidenav);
setStatic('Toggle', SidenavToggle)(EnhancedSidenav);

export default EnhancedSidenav;
