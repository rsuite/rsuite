import * as React from 'react';
import PropTypes from 'prop-types';

import { SafeAnchorProps } from './SafeAnchor.d';

const isTrivialHref = (href: string) => !href || href.trim() === '#';

class SafeAnchor extends React.Component<SafeAnchorProps> {
  static propTypes = {
    href: PropTypes.string,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    componentClass: PropTypes.elementType,
    onClick: PropTypes.func
  };

  static defaultProps = {
    componentClass: 'a'
  };

  handleClick = (event: React.MouseEvent) => {
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
    let { componentClass: Component, tabIndex, disabled, ...props } = this.props;

    if (disabled) {
      tabIndex = -1;
    }

    return <Component {...props} tabIndex={tabIndex} onClick={this.handleClick} />;
  }
}

export default SafeAnchor;
