// @flow

import * as React from 'react';
import IconFont from './IconFont';
import type { Props } from './IconFont';

type IconProps = {
  icon: string | Object,
}

class Icon extends React.Component<Props & IconProps> {
  render() {
    const { icon, ...props } = this.props;

    if (typeof icon === 'object') {
      return (
        <svg
          {...props}
          viewBox={icon.viewBox}
        >
          <use xlinkHref={`#${icon.id}`} />
        </svg>
      );
    }

    return (
      <IconFont
        {...props}
        icon={`${icon}`}
      />
    );
  }
}

export default Icon;

