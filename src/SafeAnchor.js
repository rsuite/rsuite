// @flow

import * as React from 'react';

type Props = {
  href?: string,
  onClick?: (event: SyntheticEvent<*>) => void,
  disabled?: boolean,
  role?: string,
  style?: Object,
  tabIndex?: number | string,
  componentClass: React.ElementType
};

const isTrivialHref = href => !href || href.trim() === '#';

class SafeAnchor extends React.Component<Props> {
  static defaultProps = {
    componentClass: 'a'
  };

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
  };

  render() {
    let { componentClass: Component, role, tabIndex, disabled, style, ...props } = this.props;

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
