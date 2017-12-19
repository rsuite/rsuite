// @flow

import * as React from 'react';
import classNames from 'classnames';
import createComponent from './utils/createComponent';
import prefix, { globalKey } from './utils/prefix';


type Props = {
  divider?: boolean,
  active?: boolean,
  disabled?: boolean,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  eventKey?: any,
  className?: string,
  style?: Object,
  children?: React.Node,
  classPrefix?: string
}

const Component = createComponent('a');

class DropdownMenuItem extends React.Component<Props> {

  static displayName = 'DropdownMenuItem';
  static defaultProps = {
    classPrefix: `${globalKey}dropdown-item`
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

  render() {

    let {
      children,
      divider,
      onSelect,
      active,
      disabled,
      className,
      eventKey,
      style,
      classPrefix,
      ...props
    } = this.props;

    const addPrefix = prefix(classPrefix);

    let classes = classNames(classPrefix, {
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
      >
        <Component
          {...props}
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
