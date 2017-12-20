// @flow

import * as React from 'react';
import createComponent from './utils/createComponent';

type Props = {
  href?: string,
  onClick?: (event: SyntheticEvent<*>) => void,
  disabled?: boolean,
  role?: string,
  style?: Object,
  tabIndex?: number | string,
}


const isTrivialHref = href => !href || href.trim() === '#';
const Component = createComponent('a');

class SafeAnchor extends React.Component<Props> {

  handleClick = (event: SyntheticEvent<*>) => {
    let { disabled, href, onClick } = this.props;
    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    onClick && onClick(event);
  }

  render() {

    let {
      role,
      tabIndex,
      disabled,
      style,
      ...props
    } = this.props;

    if (disabled) {
      tabIndex = -1;
    }

    return (
      <Component
        {...props}
        role={role}
        style={style}
        tabIndex={tabIndex}
        onClick={this.handleClick}
      />
    );
  }
}

export default SafeAnchor;
