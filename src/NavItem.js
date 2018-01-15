// @flow

import * as React from 'react';
import classNames from 'classnames';
import createChainedFunction from './utils/createChainedFunction';
import SafeAnchor from './SafeAnchor';
import creatComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';
import Icon from './Icon';
import Tooltip from './Tooltip';
import Whisper from './Whisper';

type Props = {
  className?: string,
  classPrefix?: string,
  active?: boolean,
  disabled?: boolean,
  onClick?: (event: SyntheticEvent<*>) => void,
  style?: Object,
  icon?: React.Element<typeof Icon>,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  children?: React.Node,
  eventKey?: any,
  tabIndex?: number,
  hasTooltip?: boolean
}

const Component = creatComponent(SafeAnchor);

const addTooltip = (children, tip) => (
  <Whisper
    speaker={<Tooltip>{tip}</Tooltip>}
    placement="right"
  >
    {children}
  </Whisper>
);


class NavItem extends React.Component<Props> {

  static displayName = 'NavItem';
  static defaultProps = {
    classPrefix: `${globalKey}nav-item`,
    tabIndex: 0,
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
      icon,
      tabIndex,
      hasTooltip,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled,
    }, className);

    const item = (
      <Component
        {...props}
        role="button"
        tabIndex={tabIndex}
        className={addPrefix('content')}
        disabled={disabled}
        onClick={createChainedFunction(onClick, this.handleClick)}
      >
        {icon}
        <span className={addPrefix('text')}>{children}</span>
      </Component>
    );

    return (
      <li
        role="presentation"
        className={classes}
        style={style}
      >
        {hasTooltip ? addTooltip(item, children) : item}
      </li>
    );
  }
}


export default NavItem;
