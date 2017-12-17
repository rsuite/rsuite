// @flow

import * as React from 'react';
import classNames from 'classnames';
import createChainedFunction from './utils/createChainedFunction';
import SafeAnchor from './SafeAnchor';
import creatComponent from './utils/createComponent';


type Props = {
  className?: string,
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
      style,
      eventKey,
      children,
      ...props
    } = this.props;

    const classes = classNames({
      active,
      disabled
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
