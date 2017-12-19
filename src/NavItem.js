// @flow

import * as React from 'react';
import classNames from 'classnames';
import createChainedFunction from './utils/createChainedFunction';
import SafeAnchor from './SafeAnchor';
import creatComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';


type Props = {
  className?: string,
  classPrefix?: string,
  active?: boolean,
  disabled?: boolean,
  onClick?: Function,
  style?: Object,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  children?: React.Node,
  eventKey?: any,
}

const Component = creatComponent(SafeAnchor);

class NavItem extends React.Component<Props> {

  static displayName = 'NavItem';
  static defaultProps = {
    classPrefix: `${globalKey}nav-item`
  };

  handleClick = (event: SyntheticEvent<*>) => {
    const { onSelect, disabled, eventKey } = this.props;
    if (onSelect && !disabled) {
      onSelect(eventKey, event);
    }
  }

  render() {
    const {
      active,
      disabled,
      onClick,
      className,
      classPrefix,
      style,
      eventKey,
      children,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled,
    }, className);

    return (
      <li
        role="presentation"
        className={classes}
        style={style}
      >
        <Component
          {...props}
          disabled={disabled}
          onClick={createChainedFunction(onClick, this.handleClick)}
        >
          {children}
        </Component>
      </li>
    );
  }
}

export default NavItem;
