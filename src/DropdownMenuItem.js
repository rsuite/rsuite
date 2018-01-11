// @flow

import * as React from 'react';
import classNames from 'classnames';
import { contains } from 'dom-lib';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';
import SafeAnchor from './SafeAnchor';
import Icon from './Icon';

type Props = {
  divider?: boolean,
  active?: boolean,
  disabled?: boolean,
  submenu?: boolean,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  icon?: string | { viewBox: string, id: string },
  eventKey?: any,
  className?: string,
  style?: Object,
  children?: React.Node,
  classPrefix?: string,
  tabIndex?: number,
}

type States = {
  open?: boolean
}

const Component = createComponent(SafeAnchor);

class DropdownMenuItem extends React.Component<Props, States> {

  static displayName = 'DropdownMenuItem';
  static defaultProps = {
    classPrefix: `${globalKey}dropdown-item`,
    tabIndex: -1,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = (event: SyntheticEvent<*>) => {
    let { onSelect, eventKey, disabled, onClick } = this.props;
    if (disabled) {
      event.preventDefault();
      return;
    }

    onSelect && onSelect(eventKey, event);
    onClick && onClick(event);
  }

  handleMouseEnter = () => {
    this.setState({ open: true });
  }

  handleMouseLeave = (event: SyntheticEvent<*>) => {
    let target = event.currentTarget;
    let related = event.relatedTarget || event.nativeEvent.toElement;
    event.stopPropagation();
    setTimeout(() => {


      const k = contains(target, related);

      console.log(k);

      if (!k) {
        this.setState({ open: false });
      }


    }, 100);

  }

  render() {

    const {
      children,
      divider,
      onSelect,
      active,
      disabled,
      className,
      eventKey,
      submenu,
      style,
      classPrefix,
      tabIndex,
      icon,
      ...props
    } = this.props;

    const { open } = this.state;
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, {
      [addPrefix('submenu')]: submenu,
      [addPrefix('open')]: open,
      [addPrefix('active')]: active,
      [addPrefix('disabled')]: disabled
    }, className);

    const hasIcon = !!icon;

    if (divider) {
      return <li role="separator" className={addPrefix('divider')} />;
    }

    return (
      <li
        style={style}
        role="presentation"
        className={classes}
        onMouseOver={submenu ? this.handleMouseEnter : null}
        onMouseOut={submenu ? this.handleMouseLeave : null}
      >
        <Component
          {...props}
          className={addPrefix('content')}
          tabIndex={tabIndex}
          onClick={this.handleClick}
        >
          {hasIcon && <Icon icon={icon} className={addPrefix('icon')} />}
          {children}
        </Component>
      </li>
    );
  }
}

export default DropdownMenuItem;
