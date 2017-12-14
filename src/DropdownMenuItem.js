// @flow

import * as React from 'react';
import classNames from 'classnames';
import createComponent from './utils/createComponent';


type Props = {
  divider?: boolean,
  active?: boolean,
  disabled?: boolean,
  onSelect?: (eventKey: any, event: SyntheticEvent<*>) => void,
  onClick?: (event: SyntheticEvent<*>) => void,
  eventKey?: any,
  className?: string,
  children?: React.Node
}

const Component = createComponent('a');

class DropdownMenuItem extends React.Component<Props> {

  static displayName = 'DropdownMenuItem';

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
      ...props
    } = this.props;

    let classes = classNames({
      active,
      disabled
    }, className);

    if (divider) {
      return <li role="separator" className="divider" />;
    }

    return (
      <li
        {...props}
        role="presentation"
        className={classes}
      >
        <Component
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
