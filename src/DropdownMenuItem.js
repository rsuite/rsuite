// @flow

import * as React from 'react';
import classNames from 'classnames';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';


type Props = {
  divider?: boolean,
  active?: boolean,
  disabled?: boolean,
  submenu?: boolean,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  eventKey?: any,
  className?: string,
  style?: Object,
  children?: React.Node,
  classPrefix?: string
}

type States = {
  open?: boolean
}

const Component = createComponent('a');

class DropdownMenuItem extends React.Component<Props, States> {

  static displayName = 'DropdownMenuItem';
  static defaultProps = {
    classPrefix: `${globalKey}dropdown-item`
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

  handleMouseLeave = () => {
    this.setState({ open: false });
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

    if (divider) {
      return <li role="separator" className={addPrefix('divider')} />;
    }

    return (
      <li
        style={style}
        role="presentation"
        className={classes}
        onMouseEnter={submenu ? this.handleMouseEnter : null}
        onMouseLeave={submenu ? this.handleMouseLeave : null}
      >
        <Component
          {...props}
          className={addPrefix('content')}
          tabIndex="-1"
          onClick={this.handleClick}
        >
          {children}
        </Component>
      </li>
    );
  }
}

export default DropdownMenuItem;
